export class toolUtil {

    // 加载JS
    loadJs = (url) => {
        return new Promise((resolve:any, reject:any) => {
            const script = document.createElement('script')
            script.src = url
            script.type = 'text/javascript'
            document.body.appendChild(script)
            script.onload = () => {
                resolve()
            }
        })
    }

     // 加载CSS
    loadCss = (url) => {
        return new Promise((resolve:any, reject:any) => {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = url
            document.head.appendChild(link)
            link.onload = () => {
                resolve()
            }
        })
    }

     // 生成UUID
    generateUUID = () => {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }
}