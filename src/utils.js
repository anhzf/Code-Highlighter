import compact from 'lodash/compact';

export function resolveUrlPath(url, path) {
    const Url = new URL(url);

    const pathToJoin = path.split('/');
    const paths = compact([...Url.pathname.split('/'), ...pathToJoin]);

    Url.pathname = paths.join('/');

    return Url;
}
