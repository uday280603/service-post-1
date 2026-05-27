

export interface Ipost{
    postId: number;
    title: string;
    description: string;
}

export interface Ires<T>{
    msg : string,
    data : Ipost

}