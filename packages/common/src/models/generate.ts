import { times } from 'rambdax';
import { blogNames, postNames, postBody, commentBodies } from './randomData';

type Database = import('@nozbe/watermelondb').Database;
type Blog = typeof import('./Blog');
type Comment = typeof import('./Comment');
type Post = typeof import('./Post');
type Model = Blog | Comment | Post;

const flatMap = (fn: (model: Model) => Model[], arr: Model[]) =>
	arr.map(fn).reduce((a, b) => a.concat(b), []);

const fuzzCount = (count: number) => {
	// makes the number randomly a little larger or smaller for fake data to seem more realistic
	const maxFuzz = 4;
	const fuzz = Math.round((Math.random() - 0.5) * maxFuzz * 2);
	return count + fuzz;
};

const makeBlog = (db: Database, i: number) =>
	db.collections.get('blogs').prepareCreate(blog => {
		blog.name = blogNames[i] || blog.id;
	});

const makePost = (db: Database, blog: Blog, i: number) =>
	db.collections.get('posts').prepareCreate(post => {
		post.title = postNames[i] || post.id;
		post.subtitle = `ID: ${post.id}`;
		post.body = postBody;
		post.blog.set(blog);
	});

const makePosts = (db: Database, blog: Blog, count: number) =>
	times(i => makePost(db, blog, i), count);

const makeComment = (db: Database, post: Post, i: number) =>
	db.collections.get('comments').prepareCreate(comment => {
		comment.body = commentBodies[i] || `Comment#${comment.id}`;
		comment.post.set(post);
		comment.isNasty = Math.random() < 0.25; // People can be not nice on the internet
	});

const makeComments = (db: Database, post: Post, count: number) =>
	times(i => makeComment(db, post, i), count);

const generate = async (
	db: Database,
	blogCount: number,
	postsPerBlog: number,
	commentsPerPost: number
) => {
	await db.action(async () => await db.unsafeResetDatabase());
	const blogs = times(i => makeBlog(db, i), blogCount);
	const posts = flatMap(blog => makePosts(db, blog, fuzzCount(postsPerBlog)), blogs);
	const comments = flatMap(post => makeComments(db, post, fuzzCount(commentsPerPost)), posts);

	const allRecords = [...blogs, ...posts, ...comments];
	await db.action(async () => await db.batch(...allRecords));

	return allRecords.length;
};

export async function generate100(database: Database) {
	return generate(database, 2, 10, 5);
}

export async function generate10k(database: Database) {
	return generate(database, 20, 20, 25);
}
