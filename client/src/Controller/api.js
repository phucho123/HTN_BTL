export const get = async ({ feed }) => {
    let data = await fetch(`https://io.adafruit.com/api/v2/${process.env.REACT_APP_ADAFRUIT_USER}/feeds/project-iot.${feed}/data?X-AIO-Key=${process.env.REACT_APP_ADAFRUIT_KEY}&limit=1`)
    let res = await data.json();
    return res;
}
export const post = async ({ data, feed }) => {
    await fetch(`https://io.adafruit.com/api/v2/${process.env.REACT_APP_ADAFRUIT_USER}/feeds/project-iot.${feed}/data?X-AIO-Key=${process.env.REACT_APP_ADAFRUIT_KEY}`, {
        'method': 'POST',
        'headers': {
            'Content-type': 'application/json'
        },
        'body': `{"datum": {"value": ${data}}}`
    })
}
export const get_chart_data = async ({ feed }) => {
    let data = await fetch(`https://io.adafruit.com/api/v2/${process.env.REACT_APP_ADAFRUIT_USER}/feeds/project-iot.${feed}/data?X-AIO-Key=${process.env.REACT_APP_ADAFRUIT_KEY}&limit=20`)
    let res = await data.json();
    return res;
}