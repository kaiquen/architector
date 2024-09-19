export interface IUseCase<IParams, IResult> {
    execute(params: IParams): Promise<IResult>;
}