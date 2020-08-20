module.exports = function() {
    let hello = document.createElement('div')
    let env = process.env.NODE_ENV
    hello.innerHTML = 'Long time no see! --- ' + env
    return hello;
}