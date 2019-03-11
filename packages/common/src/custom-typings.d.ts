declare module '@nozbe/with-observables';
declare module '@react-navigation/web';
declare module '@react-navigation/core';

declare module '@nozbe/watermelondb' {
  import * as Q from '@nozbe/watermelondb/QueryDescription'

  export { default as Collection } from '@nozbe/watermelondb/Collection'
  export { default as Database } from '@nozbe/watermelondb/Database'
  export { default as CollectionMap } from '@nozbe/watermelondb/Database/CollectionMap'
  export { default as Relation } from '@nozbe/watermelondb/Relation'
  export { default as Model, associations } from '@nozbe/watermelondb/Model'
  export { default as Query } from '@nozbe/watermelondb/Query'
  export { tableName, columnName, appSchema, tableSchema } from '@nozbe/watermelondb/Schema'

  export { DatabaseAdapter } from '@nozbe/watermelondb/adapters/type'
  export { RawRecord, DirtyRaw } from '@nozbe/watermelondb/RawRecord'
  export { RecordId } from '@nozbe/watermelondb/Model'
  export {
    TableName,
    ColumnName,
    ColumnType,
    ColumnSchema,
    TableSchema,
    AppSchema,
  } from '@nozbe/watermelondb/Schema'

  export { Q }
}
declare module '@nozbe/watermelondb/Collection/RecordCache' {
  import { Model, RawRecord, RecordId, TableName } from '@nozbe/watermelondb'
  import { CachedQueryResult } from '@nozbe/watermelondb/adapters/type'

  type Instantiator<T> = (raw: RawRecord) => T

  export default class RecordCache<Record extends Model> {
    public map: Map<RecordId, Record>

    public tableName: TableName<Record>

    public recordInsantiator: Instantiator<Record>

    public constructor(tableName: TableName<Record>, recordInsantiator: Instantiator<Record>)

    public get(id: RecordId): Record | void

    public add(record: Record): void

    public delete(record: Record): void

    public unsafeClear(): void

    public recordsFromQueryResult(result: CachedQueryResult): Record[]

    public recordFromQueryResult(result: RecordId | RawRecord): Record
  }
}
declare module '@nozbe/watermelondb/Collection' {
  import { Database, Model, Query, RecordId, TableName, TableSchema } from '@nozbe/watermelondb'
  import { Condition } from '@nozbe/watermelondb/QueryDescription'
  import { Class } from '@nozbe/watermelondb/utils/common'
  import { Observable, Subject } from 'rxjs'

  export interface CollectionChange<Record extends Model> {
    record: Record
    isDestroyed: boolean
  }

  export default class Collection<Record extends Model> {
    public database: Database

    public modelClass: Class<Record>

    public changes: Subject<CollectionChange<Record>>

    public table: TableName<Record>

    public schema: TableSchema

    public constructor(database: Database, ModelClass: Class<Record>)

    public find(id: RecordId): Promise<Record>

    public findAndObserve(id: RecordId): Observable<Record>

    public query(...conditions: Condition[]): Query<Record>

    public create(recordBuilder?: (record: Record) => void): Promise<Record>

    public prepareCreate(recordBuilder?: (record: Record) => void): Record

    public fetchQuery(query: Query<Record>): Promise<Record[]>

    public fetchCount(query: Query<Record>): Promise<number>

    public unsafeClearCache(): void
  }
}
declare module '@nozbe/watermelondb/Database/CollectionMap' {
  import { Collection, Database, Model, TableName } from '@nozbe/watermelondb'
  import { Class } from '@nozbe/watermelondb/utils/common'

  export default class CollectionMap {
    public map: { [tableName: string]: Collection<any> }

    public constructor(database: Database, modelClasses: Array<Class<Model>>)

    public get<T extends Model>(tableName: TableName<T>): Collection<T>
  }
}
declare module '@nozbe/watermelondb/Database' {
  import { AppSchema, CollectionMap, DatabaseAdapter, Model, TableName } from '@nozbe/watermelondb'
  import { CollectionChange } from '@nozbe/watermelondb/Collection'
  import { Class } from '@nozbe/watermelondb/utils/common'
  import { Observable } from 'rxjs'

  export interface ActionInterface {
    subAction<T>(action: () => Promise<T>): Promise<T>
  }

  export default class Database {
    public adapter: DatabaseAdapter

    public schema: AppSchema

    public collections: CollectionMap

    // TODO: modelClasses: Array<ModelSubClass>
    public constructor(options: { adapter: DatabaseAdapter; modelClasses: Array<Class<Model>> })

    public batch(...records: Model[]): Promise<void>

    // TODO: action<T>(work: ActionInterface => Promise<T>, description?: string): Promise<T>
    public action<T>(work: any, description?: string): Promise<T>

    public withChangesForTables(
      tables: Array<TableName<any>>,
    ): Observable<CollectionChange<any> | null>

    public unsafeResetDatabase(): Promise<void>
  }
}
declare module '@nozbe/watermelondb/DatabaseProvider' {
  import * as React from 'react'
  import Database from '@nozbe/watermelondb/Database'

  export interface DatabaseProviderProps {
    children?: React.ReactChild // only one child is allowed, goes through React.Children.only
    database: Database
  }

  export const DatabaseProviderComponent: React.ComponentClass<DatabaseProviderProps>

  /**
   * HOC
   * https://gist.github.com/thehappybug/88342c122cfb1df9f14c9a10fb4926e4
   */
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  export function withDatabase<P extends { database?: Database }, R = Omit<P, 'database'>>(
    Component: React.ComponentType<P> | React.FunctionComponent<P>,
  ): React.FunctionComponent<R>

  export default DatabaseProviderComponent
}
declare module '@nozbe/watermelondb/Model/helper' {
  import { Model } from '@nozbe/watermelondb'

  export const hasUpdatedAt: (obj: Object) => boolean

  export const createTimestampsFor: (
    model: Model,
  ) => {
    created_at: Date
    updated_at: Date
  }

  export function addToRawSet(rawSet: string | void, value: string): string
}
declare module '@nozbe/watermelondb/Model' {
  import { ColumnName, TableName, Collection } from '@nozbe/watermelondb'
  import { Observable } from 'rxjs'

  export type RecordId = string

  export type SyncStatus = 'synced' | 'created' | 'updated' | 'deleted'

  export interface BelongsToAssociation {
    type: 'belongs_to'
    key: ColumnName
  }
  export interface HasManyAssociation {
    type: 'has_many'
    foreignKey: ColumnName
  }
  export type AssociationInfo = BelongsToAssociation | HasManyAssociation
  export interface Associations {
    [tableName: string]: AssociationInfo
  }

  export function associations(
    ...associationList: Array<[TableName<any>, AssociationInfo]>
  ): Associations

  export default class Model {
    // FIXME: How to correctly point to a static this?
    public static table: TableName<Model>

    public static associations: Associations

    public id: RecordId

    public syncStatus: SyncStatus

    public update(recordUpdater?: (this: this) => void): Promise<void>

    public prepareUpdate(recordUpdater?: (this: this) => void): this

    public markAsDeleted(): Promise<void>

    public destroyPermanently(): Promise<void>

    public observe(): Observable<this>

    public batch(...records: Readonly<[Model]>): Promise<void>

    public subAction<T>(action: () => Promise<T>): Promise<T>

    public collection: Collection<this>
  }
}
declare module '@nozbe/watermelondb/Query/helpers' {
  import { QueryDescription } from '@nozbe/watermelondb/QueryDescription'
  import { TableName } from '@nozbe/watermelondb'
  import { AssociationInfo, Associations } from '@nozbe/watermelondb/Model'

  export const getSecondaryTables: QueryDescription

  export const getAssociations: (
    table: TableName<any>[],
    associations: Associations,
  ) => [TableName<any>, AssociationInfo][]
}
declare module '@nozbe/watermelondb/Query' {
  import { Collection, ColumnName, Model, TableName } from '@nozbe/watermelondb'
  import { AssociationInfo } from '@nozbe/watermelondb/Model'
  import { Condition, QueryDescription } from '@nozbe/watermelondb/QueryDescription'
  import { Observable } from 'rxjs'

  export type AssociationArgs = [TableName<any>, AssociationInfo]
  export interface SerializedQuery {
    table: TableName<any>
    description: QueryDescription
    associations: AssociationArgs[]
  }

  export default class Query<Record extends Model> {
    public collection: Collection<Record>

    public description: QueryDescription

    public extend(...conditions: Condition[]): Query<Record>

    public pipe<T>(transform: (this: this) => T): T

    public fetch(): Promise<Record[]>

    public observe(): Observable<Record[]>

    public observeWithColumns(rawFields: ColumnName[]): Observable<Record[]>

    public fetchCount(): Promise<number>

    public observeCount(isThrottled?: boolean): Observable<number>

    public markAllAsDeleted(): Promise<void>

    public destroyAllPermanently(): Promise<void>
  }
}
declare module '@nozbe/watermelondb/QueryDescription' {
  import { ColumnName, TableName } from '@nozbe/watermelondb'

  export type NonNullValue = number | string | boolean
  export type Value = NonNullValue | null
  export type CompoundValue = Value | Value[]

  export type Operator =
    | 'eq'
    | 'notEq'
    | 'gt'
    | 'gte'
    | 'weakGt' // TODO: Do we still even need `gt`?
    | 'lt'
    | 'lte'
    | 'oneOf'
    | 'notIn'
    | 'between'

  export interface ColumnDescription {
    column: ColumnName
  }

  export type ComparisonRight = { value: Value } | { values: NonNullValue[] } | ColumnDescription

  export interface Comparison {
    operator: Operator
    right: ComparisonRight
  }

  export interface WhereDescription {
    type: 'where'
    left: ColumnName
    comparison: Comparison
  }

  export type Where = WhereDescription | And | Or
  export interface And {
    type: 'and'
    conditions: Where[]
  }
  export interface Or {
    type: 'or'
    conditions: Where[]
  }
  export interface On {
    type: 'on'
    table: TableName<any>
    left: ColumnName
    comparison: Comparison
  }
  export type Condition = Where | On
  export interface QueryDescription {
    where: Where[]
    join: On[]
  }

  export function eq(valueOrColumn: Value | ColumnDescription): Comparison
  export function notEq(valueOrColumn: Value | ColumnDescription): Comparison
  export function gt(valueOrColumn: NonNullValue | ColumnDescription): Comparison
  export function gte(valueOrColumn: NonNullValue | ColumnDescription): Comparison
  export function weakGt(valueOrColumn: NonNullValue | ColumnDescription): Comparison
  export function lt(valueOrColumn: NonNullValue | ColumnDescription): Comparison
  export function lte(valueOrColumn: NonNullValue | ColumnDescription): Comparison
  export function oneOf(values: NonNullValue[]): Comparison
  export function notIn(values: NonNullValue[]): Comparison
  export function between(left: number, right: number): Comparison
  export function column(name: ColumnName): ColumnDescription
  export function where(left: ColumnName, valueOrComparison: Value | Comparison): WhereDescription
  export function and(...conditions: Where[]): And
  export function or(...conditions: Where[]): Or
  export function like(value: string): Comparison
  export function sanitizeLikeString(value: string): string

  type _OnFunctionColumnValue = (table: TableName<any>, column: ColumnName, value: Value) => On
  type _OnFunctionColumnComparison = (
    table: TableName<any>,
    column: ColumnName,
    comparison: Comparison,
  ) => On
  type _OnFunctionWhereDescription = (table: TableName<any>, where: WhereDescription) => On

  type OnFunction = _OnFunctionColumnValue &
    _OnFunctionColumnComparison &
    _OnFunctionWhereDescription

  export const on: OnFunction

  export function buildQueryDescription(conditions: Condition[]): QueryDescription
  export function queryWithoutDeleted(query: QueryDescription): QueryDescription
  export function hasColumnComparisons(conditions: Where[]): boolean
}
declare module '@nozbe/watermelondb/RawRecord' {
  import { ColumnName, ColumnSchema, RecordId, TableSchema } from '@nozbe/watermelondb'
  import { SyncStatus } from '@nozbe/watermelondb/Model'

  export type DirtyRaw = object

  export interface RawRecord {
    id: RecordId
    _status: SyncStatus
    _changed: string
    last_modified: number | null
  }

  export function sanitizedRaw(dirtyRaw: DirtyRaw, tableSchema: TableSchema): RawRecord

  export function setRawSanitized(
    rawRecord: RawRecord,
    columnName: ColumnName,
    value: any,
    columnSchema: ColumnSchema,
  ): void
}
declare module '@nozbe/watermelondb/Relation/helpers' {
  import { Model, Relation } from '@nozbe/watermelondb'
  import { Observable } from 'rxjs'

  export function getImmutableObservable<T extends Model | void>(
    relation: Relation<T>,
  ): Observable<T>

  export function getObservable<T extends Model | void>(relation: Relation<T>): Observable<T>

  export function createObservable<T extends Model | void>(relation: Relation<T>): Observable<T>
}
declare module '@nozbe/watermelondb/Relation' {
  import { ColumnName, Model, RecordId, TableName } from '@nozbe/watermelondb'
  import { Observable } from 'rxjs'
  import { $Call } from '@nozbe/watermelondb/utils/common'

  type ExtractRecordIdNonOptional<T extends Model> = (value: T) => RecordId
  type ExtractRecordIdOptional<T extends Model> = (value: T | void) => RecordId | void
  type ExtractRecordId<T extends Model> = ExtractRecordIdNonOptional<T> & ExtractRecordIdOptional<T>

  export interface Options {
    isImmutable: boolean
  }

  export default class Relation<T extends Model | void> {
    public constructor(
      model: Model,
      relationTableName: TableName<T>,
      columnName: ColumnName,
      options: Options,
    )

    public id: $Call<ExtractRecordId<T>>

    public fetch(): Promise<T>

    public set(record: T): void

    public observe(): Observable<T>
  }
}
declare module '@nozbe/watermelondb/Schema' {
  import { Model } from '@nozbe/watermelondb'

  export type TableName<T extends Model | void> = string
  export type ColumnName = string

  export function tableName<T extends Model>(name: string): TableName<T>

  export function columnName(name: string): ColumnName

  export type ColumnType = 'string' | 'number' | 'boolean'

  export interface ColumnSchema {
    name: ColumnName
    type: ColumnType
    isOptional?: boolean
    isIndexed?: boolean
  }

  interface ColumnMap {
    [name: string]: ColumnSchema
  }

  export type TableSchemaSpec = { name: TableName<any>; columns: ColumnSchema[] }

  export interface TableSchema {
    name: TableName<any>
    columns: ColumnMap
  }

  interface TableMap {
    [name: string]: TableSchema
  }

  export interface AppSchema {
    version: number
    tables: TableMap
  }

  export function appSchema(options: { version: number; tables: TableSchema[] }): AppSchema

  export function tableSchema(options: TableSchemaSpec): TableSchema
}
declare module '@nozbe/watermelondb/adapters/type' {
  import { AppSchema, Model, Query, RawRecord, RecordId, TableName } from '@nozbe/watermelondb'

  export type CachedFindResult = RecordId | (RawRecord | void)
  export type CachedQueryResult = Array<RecordId | RawRecord>
  export type BatchOperation =
    | ['create', Model]
    | ['update', Model]
    | ['markAsDeleted', Model]
    | ['destroyPermanently', Model]

  export interface DatabaseAdapter {
    schema: AppSchema
    // Fetches given (one) record or null. Should not send raw object if already cached in JS
    find(table: TableName<any>, id: RecordId): Promise<CachedFindResult>

    // Fetches matching records. Should not send raw object if already cached in JS
    query<T extends Model>(query: Query<T>): Promise<CachedQueryResult>

    // Counts matching records
    count<T extends Model>(query: Query<T>): Promise<number>

    // Executes multiple prepared operations
    batch(operations: BatchOperation[]): Promise<void>

    // Return marked as deleted records
    getDeletedRecords(tableName: TableName<any>): Promise<RecordId[]>

    // Destroy deleted records from sync
    destroyDeletedRecords(tableName: TableName<any>, recordIds: RecordId[]): Promise<void>

    // Destroys the whole database, its schema, indexes, everything.
    unsafeResetDatabase(): Promise<void>

    // Fetches string value from local storage
    getLocal(key: string): Promise<string | void>

    // Sets string value to a local storage key
    setLocal(key: string, value: string): Promise<void>

    // Removes key from local storage
    removeLocal(key: string): Promise<void>

    // Do not use — only for testing purposes
    unsafeClearCachedRecords(): Promise<void>
  }
}
declare module '@nozbe/watermelondb/adapters/lokijs' {
  import {
    AppSchema,
    DatabaseAdapter,
    Model,
    Query,
    RecordId,
    TableName,
  } from '@nozbe/watermelondb'
  import {
    BatchOperation,
    CachedFindResult,
    CachedQueryResult,
  } from '@nozbe/watermelondb/adapters/type'

  export interface LokiAdapterOptions {
    dbName: string
    schema: AppSchema
  }

  export default class LokiJSAdapter implements DatabaseAdapter {
    schema: AppSchema

    constructor(options: LokiAdapterOptions)

    batch(operations: BatchOperation[]): Promise<void>

    count<T extends Model>(query: Query<T>): Promise<number>

    destroyDeletedRecords(tableName: TableName<any>, recordIds: RecordId[]): Promise<void>

    find(table: TableName<any>, id: RecordId): Promise<CachedFindResult>

    getDeletedRecords(tableName: TableName<any>): Promise<RecordId[]>

    getLocal(key: string): Promise<string | void>

    query<T extends Model>(query: Query<T>): Promise<CachedQueryResult>

    removeLocal(key: string): Promise<void>

    setLocal(key: string, value: string): Promise<void>

    unsafeClearCachedRecords(): Promise<void>

    unsafeResetDatabase(): Promise<void>
  }
}
declare module '@nozbe/watermelondb/adapters/sqlite' {
  import {
    AppSchema,
    DatabaseAdapter,
    Model,
    Query,
    RecordId,
    TableName,
  } from '@nozbe/watermelondb'
  import {
    BatchOperation,
    CachedFindResult,
    CachedQueryResult,
  } from '@nozbe/watermelondb/adapters/type'

  export type SQL = string

  export type SQLiteArg = string | boolean | number | null

  export type SQLiteQuery = [SQL, SQLiteArg[]]

  export interface SQLiteAdapterOptions {
    dbName: string
    schema: AppSchema
  }

  export default class SQLiteAdapter implements DatabaseAdapter {
    schema: AppSchema

    constructor(options: SQLiteAdapterOptions)

    batch(operations: BatchOperation[]): Promise<void>

    count<T extends Model>(query: Query<T>): Promise<number>

    destroyDeletedRecords(tableName: TableName<any>, recordIds: RecordId[]): Promise<void>

    find(table: TableName<any>, id: RecordId): Promise<CachedFindResult>

    getDeletedRecords(tableName: TableName<any>): Promise<RecordId[]>

    getLocal(key: string): Promise<string | void>

    query<T extends Model>(query: Query<T>): Promise<CachedQueryResult>

    removeLocal(key: string): Promise<void>

    setLocal(key: string, value: string): Promise<void>

    unsafeClearCachedRecords(): Promise<void>

    unsafeResetDatabase(): Promise<void>
  }
}
declare module '@nozbe/watermelondb/decorators/common' {
  import { ColumnName } from '@nozbe/watermelondb'

  export function ensureDecoratorUsedProperly(
    columnName: ColumnName,
    target: Object,
    key: string,
    descriptor: Object,
  ): void
}
declare module '@nozbe/watermelondb/decorators' {
  export { default as action } from '@nozbe/watermelondb/decorators/action'
  export { default as children } from '@nozbe/watermelondb/decorators/children'
  export { default as date } from '@nozbe/watermelondb/decorators/date'
  export { default as field } from '@nozbe/watermelondb/decorators/field'
  export { default as immutableRelation } from '@nozbe/watermelondb/decorators/immutableRelation'
  export { default as json } from '@nozbe/watermelondb/decorators/json'
  export { default as lazy } from '@nozbe/watermelondb/decorators/lazy'
  export { default as nochange } from '@nozbe/watermelondb/decorators/nochange'
  export { default as readonly } from '@nozbe/watermelondb/decorators/readonly'
  export { default as relation } from '@nozbe/watermelondb/decorators/relation'
  export { default as text } from '@nozbe/watermelondb/decorators/text'
}
declare module '@nozbe/watermelondb/decorators/action' {
  const action: MethodDecorator
  export default action
}
declare module '@nozbe/watermelondb/decorators/children' {
  import { TableName } from '@nozbe/watermelondb'
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'

  const children: Decorator<[TableName<any>], (childTable: TableName<any>) => RawDecorator>
  export default children
}
declare module '@nozbe/watermelondb/decorators/date' {
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'
  import { ColumnName } from '@nozbe/watermelondb'

  const date: Decorator<[ColumnName], (columnName: ColumnName) => RawDecorator>
  export default date
}
declare module '@nozbe/watermelondb/decorators/field' {
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'
  import { ColumnName } from '@nozbe/watermelondb'

  const field: Decorator<[ColumnName], (columnName: ColumnName) => RawDecorator>
  export default field
}
declare module '@nozbe/watermelondb/decorators/immutableRelation' {
  import { ColumnName, TableName } from '@nozbe/watermelondb'
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'

  const immutableRelation: Decorator<
    [TableName<any>, ColumnName],
    (relationTable: TableName<any>, relationIdColumn: ColumnName) => RawDecorator
  >

  export default immutableRelation
}
declare module '@nozbe/watermelondb/decorators/json' {
  import { ColumnName } from '@nozbe/watermelondb'
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'

  type Sanitizer = (source: any) => any

  const json: Decorator<
    [ColumnName, Sanitizer],
    (rawFieldName: ColumnName, sanitizer: Sanitizer) => RawDecorator
  >

  export default json
}
declare module '@nozbe/watermelondb/decorators/lazy' {
  const lazy: MethodDecorator
  export default lazy
}
declare module '@nozbe/watermelondb/decorators/nochange' {
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'

  const nochange: Decorator<[], () => RawDecorator>

  export default nochange
}
declare module '@nozbe/watermelondb/decorators/readonly' {
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'

  const readonly: Decorator<[], () => RawDecorator>

  export default readonly
}
declare module '@nozbe/watermelondb/decorators/relation' {
  import { ColumnName, TableName } from '@nozbe/watermelondb'
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'
  import { Options } from '@nozbe/watermelondb/Relation'

  const relation: Decorator<
    [TableName<any>, ColumnName, Options | void],
    (
      relationTable: TableName<any>,
      relationIdColumn: ColumnName,
      options: Options | void,
    ) => RawDecorator
  >

  export default relation
}
declare module '@nozbe/watermelondb/decorators/text' {
  import { ColumnName } from '@nozbe/watermelondb'
  import { Decorator, RawDecorator } from '@nozbe/watermelondb/utils/common/makeDecorator'

  const text: Decorator<[ColumnName], (columnName: ColumnName) => RawDecorator>

  export default text
}
declare module '@nozbe/watermelondb/hooks' {
  import { Database } from '@nozbe/watermelondb'

  export function useDatabase(): Database
}
declare module '@nozbe/watermelondb/observation/observeCount' {
  import { Model, Query } from '@nozbe/watermelondb'
  import { Observable } from 'rxjs'

  export default function observeCount<Record extends Model>(
    query: Query<Record>,
    isThrottled: boolean,
  ): Observable<number>
}
declare module '@nozbe/watermelondb/observation/observeQuery' {
  import { Model, Query } from '@nozbe/watermelondb'
  import { Observable } from 'rxjs'

  export default function observeQuery<Record extends Model>(
    query: Query<Record>,
  ): Observable<Record[]>
}
declare module '@nozbe/watermelondb/observation/reloadingObserver' {
  import { Model, Query } from '@nozbe/watermelondb'
  import { Observable } from 'rxjs'

  export default function reloadingObserver<Record extends Model>(
    query: Query<Record>,
  ): Observable<Record[]>
}
declare module '@nozbe/watermelondb/utils/common' {
  /**
   * Class
   * @desc Represents constructor of type T
   * @see https://flow.org/en/docs/types/utilities/#toc-class
   * @example
   *   class Store {}
   *   function makeStore(storeClass: Class<Store>): Store {
   *     return new storeClass();
   *   }
   */
  export type Class<T> = new (...args: any[]) => T

  /**
   * A function type whose return value is a function that takes
   * the same parameters as the input function, but returns a fixed
   * type, also passed via parameter.
   * */
  export type ReplaceReturn<Args extends any[], R, F extends (...args: Args) => R> = (
    ...args: Args
  ) => R

  /**
   * $Call
   * @desc get the return type from a given typeof expression
   * @see https://flow.org/en/docs/types/utilities/#toc-call
   * @example
   *   // Common use-case
   *   const add = (amount: number) => ({ type: 'ADD' as 'ADD', payload: amount });
   *   type AddAction = $Call<typeof returnOfIncrement>; // { type: 'ADD'; payload: number }
   *
   *   // Examples migrated from Flow docs
   *   type ExtractPropType<T extends { prop: any }> = (arg: T) => T['prop'];
   *   type Obj = { prop: number };
   *   type PropType = $Call<ExtractPropType<Obj>>; // number
   *
   *   type ExtractReturnType<T extends () => any> = (arg: T) => ReturnType<T>;
   *   type Fn = () => number;
   *   type FnReturnType = $Call<ExtractReturnType<Fn>>; // number
   */
  export type $Call<Fn extends (...args: any[]) => any> = Fn extends (arg: any) => infer RT
    ? RT
    : never
}
declare module '@nozbe/watermelondb/utils/common/makeDecorator' {
  // import { ReplaceReturn } from '@nozbe/watermelondb/utils/common'

  export type Descriptor = Object
  export type RawDecorator = (target: Object, key: string, descriptor: Descriptor) => Descriptor
  export type RawDecoratorFactory<T extends any[]> = (...any: T) => RawDecorator

  export type Decorator<
    Args extends any[],
    Factory extends RawDecoratorFactory<Args>
    // TODO: fix
  > = ReplaceReturn<Args, Descriptor | RawDecorator, Factory>

  export default function makeDecorator<
    Args extends any[],
    T extends RawDecoratorFactory<Args>
  >(): Decorator<Args, T>
}