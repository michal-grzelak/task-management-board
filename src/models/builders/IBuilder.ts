export interface IBuilder<I, C> {
    build: () => C

    fromData: (data: I) => IBuilder<I, C>
}
