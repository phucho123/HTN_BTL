export const get = async({feed}) => {
    let data = await fetch(`https://io.adafruit.com/api/v2/PhucHo123/feeds/${feed}/data?X-AIO-Key=aio_AoPz05HKIPs0c2QGpUMldKkGCrTc&limit=1`)
    let res = await data.json();
    return res;
}
export const post = async({data,feed}) => {
    await fetch(`https://io.adafruit.com/api/v2/PhucHo123/feeds/${feed}/data?X-AIO-Key=aio_AoPz05HKIPs0c2QGpUMldKkGCrTc`,{
        'method': 'POST',
        'headers': {
            'Content-type': 'application/json'
        },
        'body': `{"datum": {"value": ${data}}}`
    })
}