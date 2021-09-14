// function insert(nums){
//     let len=nums.length;
//     let preIndex,current;
//     for(let i=1;i<len;i++){
//         preIndex=i-1;
//         current=nums[i];
//         while(preIndex>=0&&current<nums[preIndex]){
//             if(nums[preIndex+1]<nums[preIndex]){
//                 nums[preIndex+1]=nums[preIndex];
//             }
//             preIndex--;
//         }
//         nums[preIndex+1]=current;
//     }
//     return nums;
// }
function insert(nums) {
    let len=nums.length;
    for(let i=1;i<len;i++){
        for(let j=i-1;j>=0;j--){
            if(nums[i]<nums[j]){
                [nums[i],nums[j]]=[nums[j],nums[i]];
            }
        }
    }
    return nums
}

console.log(insert([34,1,324,43]))