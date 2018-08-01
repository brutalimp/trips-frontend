const meta  = {
   serverHost : "192.168.1.5",
   https: false,
   port: 8092
} 

const readMeta = (meta) => {
    let url = '';
    meta.https? url +='https://' : url +='http://';
    url += meta.serverHost + ':' + meta.port+'/';
    return {
        url,
        AMapKey: '92dd08807095095bf3e11784a5585971'
    }
}

export const config = readMeta(meta);