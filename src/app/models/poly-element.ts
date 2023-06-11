export interface PolyElement {
    type: string,
    title: string,
    icon: string,
    url: string,
    children: PolyElement[],
    data: string
}