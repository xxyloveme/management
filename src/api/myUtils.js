export default class myUtils {
  static filter (arr, min, max) {
    if (arr instanceof Array) {
      if (arr.length === 0) {
        return false
      } else {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
          if (!isNaN(arr[i])) {
            if (arr[i] > min && arr[i] < max) {
              newArr.push(arr[i])
            }
          }
        }
        return newArr
      }
    } else {
      return false
    }
  }
}
