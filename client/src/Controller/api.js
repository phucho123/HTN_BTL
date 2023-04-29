export const get = async({feed}) => {
    let data = await fetch(`https://io.adafruit.com/api/v2/PhucHo123/feeds/${feed}/data?X-AIO-Key=aio_UmMp89tirxTRtNmHylPj57udgFaR&limit=1`)
    let res = await data.json();
    return res;
}
export const post = async({data,feed}) => {
    await fetch(`https://io.adafruit.com/api/v2/PhucHo123/feeds/${feed}/data?X-AIO-Key=aio_UmMp89tirxTRtNmHylPj57udgFaR`,{
        'method': 'POST',
        'headers': {
            'Content-type': 'application/json'
        },
        'body': `{"datum": {"value": ${data}}}`
    })
}
export const get_chart_data = async({feed}) => {
    let data = await fetch(`https://io.adafruit.com/api/v2/PhucHo123/feeds/${feed}/data?X-AIO-Key=aio_UmMp89tirxTRtNmHylPj57udgFaR&limit=20`)
    let res = await data.json();
    return res;
}