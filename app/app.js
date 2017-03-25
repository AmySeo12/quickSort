function QuickSort(){};
/*Contenainer, input and boxes*/
QuickSort.container = "#container";
/*Total number of boxes */
QuickSort.input = "#number"
QuickSort.boxes = [];
/*
The Box class is used to visually represent an item in a list,
where its height is the attribute it is sorted on. A color
gradient is included to make the boxes stand out more.
*/
function Box(x,height,lightness){
  this.x = x;
  this.height = height;
  this.color = "hsl(220,100%, " + lightness+ "%)";
  this.div = $("<div>")
    .addClass("box")
    .css({
      "height":height,
      "left": x
      });
};

/*
draw appends the box to the container element.
*/
Box.prototype.draw = function(){
  $(QuickSort.container).append(this.div)
}

/*
updateX is used to modify the x offset of a box.
Once the x is modified, jQuery's animate function is 
called to move the box to its new x offset.
*/
Box.prototype.updateX = function(new_x){
  this.x = new_x;
  //$(this.div).css("left", new_x);
  $(this.div).animate({"left": new_x}, 1000);
}

/*
QuickSort.swap function takes indices i and j and swaps
them in the array this.boxes and swaps their x
offset.
*/

QuickSort.swap = function(i,j){
  var temp = this.boxes[i];
  var x = temp.x
  this.boxes[i] = this.boxes[j];
  this.boxes[j] = temp;
  this.boxes[j].updateX(this.boxes[i].x);
  this.boxes[i].updateX(x);
}
 
QuickSort.add = function(){
  QuickSort.elements= $(QuickSort.input).val().split(",");
  //Dynamically determine size of container
  if ($(QuickSort.input).val() !== "" && QuickSort.noRepeat(QuickSort.elements)) {}
    $(QuickSort.container).css({
      width: (QuickSort.elements.length * 45) + 8,
      height: (QuickSort.elements.length * 15) + 10,
    })

    $(QuickSort.container).text("");

    //Create boxes and draw them
    for(var i=1;i<= QuickSort.elements.length;i++){
      lightness = (100 - (2.5 * i))/100 * 100
      QuickSort.boxes[i - 1] = new Box((45 * (i - 1)) + 5, 10 * QuickSort.elements[i-1], lightness);
      QuickSort.boxes[i - 1].draw();
    }

}

/*
partition is a port of the pseudo code from wikipedia's
quicksort page: http://en.wikipedia.org/wiki/QuickQuickSort#In-place_version
*/
QuickSort.partition = function(left, right){

  pivot_value = QuickSort.boxes[left].height;
  QuickSort.swap(left,right - 1) //move pivot to end
  store_index = left;
  
  for(var i = left; i < right; i++){
    if(QuickSort.boxes[i].height < pivot_value){
      QuickSort.swap(i,store_index);
      store_index += 1;
    }
  }
  QuickSort.swap(store_index,right - 1);
  return store_index;
}

/*
quicksort sorts the Sort.boxes using quicksort. It 
recursively partitions the array, thereby sorting
it in nlogn time.
*/
QuickSort.quicksort = function(left, right){

  if(right - left <= 1){
    return
  }
  var part_i = QuickSort.partition(left, right)

  setTimeout(QuickSort.quicksort(left, part_i), 6000)
  setTimeout(QuickSort.quicksort(part_i + 1, right), 6000)

}

QuickSort.noRepeat= function(arr){
  var ms= new Set();
  for(var i= 0; i < arr.length; i++){
    if(ms.has(arr[i])){
      return false;
    }
    ms.add(arr[i]);
  }
  return true;
}

$(document).ready(function(){

  //add event handlers to 2 buttons
  $("#mix").click(function(){QuickSort.add()});
  $("#quick").click(function(){QuickSort.quicksort(0,QuickSort.boxes.length)});
})
