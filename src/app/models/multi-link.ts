export interface MultiLinkElement {
    country: string,
    countryCode: string,
    title: string,
    url: string,
    links: LinkElement[],
    shouldShow: boolean,
}

export interface LinkElement {
    title: string,
    url: string,
}