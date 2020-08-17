
export default function getSafeTop(env) {
    // if (env.clientType === 'app' && env.isWBHost) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             Flib.ready(() => {
    //                 WBAPP.invoke('get_status_bar',(payload)=>{
    //                     const resp = JSON.parse(payload) ;
    //                     const { height,mode } = resp ;
    //                     console.log("get_status_bar>>>>", resp);
    //                     resolve(Number(height) || 20);
    //                 });
    //             })
    //         } catch (error) {
    //             resolve(20);
    //         }
    //     });
    // } else {
    //     return Promise.resolve(0);
    // }
    return Promise.resolve(0);
}