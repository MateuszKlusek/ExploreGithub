// put separator between 3th digit for number bigger than 999
export const formatSize = (size) => {
    var stringFromSize = size + ""
    var newString = ''
    for (var i = stringFromSize.length - 1; i >= 0; i--) {
        if (stringFromSize.length > 3 && i !== stringFromSize.length - 1 && i % 3 === 0) { newString += ',' }
        newString += stringFromSize[i]
    }
    return newString.split("").reverse().join("")
}