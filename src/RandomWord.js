let Programming_Language=[
    'Java',
    'python',
    'mysql',
    'javascript',
    'ruby',
    'c'
]

function randomword() {
    return Programming_Language
    [
        Math.floor(Math.random()*Programming_Language.length)
    ]
}
export {randomword}