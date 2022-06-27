export interface Deserializable<T> {
  deserialize(buf: Buffer, offset?: number): [T, number];
}

export interface Decodable<T> {
  decode(b: Buffer, offset?: number): T;
}
