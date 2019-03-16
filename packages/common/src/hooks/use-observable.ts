import { Subject, Subscription } from 'rxjs';
import { useEffect, useMemo, useState } from 'react';

// export default function useObservable(observable: any, initial?: any, inputs: any[] = []) {
// 	const [state, setState] = useState(initial);
// 	const subject = useMemo(() => new Subject(), inputs);

// 	useEffect(() => {
// 		const subscription = new Subscription();
// 		subscription.add(subject);
// 		subscription.add(subject.pipe(() => observable).subscribe(value => setState(value)));
// 		return () => subscription.unsubscribe();
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [subject]);

// 	return state;
// }

export default function useObservable(observable: any, initial?: any) {
	const [value, setValue] = useState(initial);

	useEffect(() => {
		const subscription = observable.subscribe(setValue);
		return () => subscription.unsubscribe();
	}, [observable]);

	return value;
}
