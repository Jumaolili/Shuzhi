function Insertion(arr){
    let len=arr.length;
    let preIndex,current;
    for(let i=1;i<len;i++){
        current=arr[i];
        preIndex=i-1;
        while (preIndex>=0&&current<arr[preIndex]) {
            arr[preIndex+1]=arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1]=current;
    }
    return arr;
}


console.log(Insertion([3,234,1,34,5]))