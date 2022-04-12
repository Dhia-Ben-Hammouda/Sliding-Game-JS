const board = document.querySelector(".game-container");
const items = [];
const size = 3;


generateItems();
randomPositions();
renderBoard();
handleInput();

function getRow(position)
{ 
  return Math.ceil(  position / size  );
}

function getColumn(position)
{
  const a = position % size;
  if( a === 0 )
  {
    return size;
  }
  return a;
}

function generateItems()
{
  for(let i=1;i<=size*size;i++)
  {
    items.push({
      value:i,
      position:i,
      x: (getColumn(i) - 1) * 200,
      y: (getRow(i) - 1) *200 ,
      hidden:false
    })
  }
}

function renderBoard()
{
  board.innerHTML = "";
  items.forEach( (item,index,arr)=>{
    if(item.hidden == false)
    {
      board.innerHTML += `
      <div class="item" style="left:${item.x}px;top:${item.y}px">
      ${item.value}
      </div>`
    }
  })
}

function randomPositions()
{
  const randomValues = [];

  while(randomValues.length != 9)
  {
    var randomNumber = Math.floor(  Math.random() * 9) +1;

    if(!randomValues.includes(randomNumber))
    {
      randomValues.push(randomNumber);
    }
  }

  for(let i=0;i<items.length;i++)
  {
    items[i].value = randomValues[i];
  }


  const itemWithNineValue = items.find( (item)=> item.value === size*size )
  itemWithNineValue.hidden = true;
}

function handleInput()
{
  document.addEventListener("keydown" , handleKeyDown);
}


function handleKeyDown(e)
{
  console.log(e.key);
  switch(e.key)
  {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
  }
  renderBoard();
  
  if(  items.every( (item)=>item.value === item.position ) )
  {
    alert("you won !!!");
  }
}

function moveUp()
{
  const hiddenItem = getHiddenItem();
  const underItem = getUnderItem();
  if(underItem)
  {
    swapPositions( hiddenItem , underItem , false);
  }
}

function moveDown()
{
  const hiddenItem = getHiddenItem();
  const overItem = getOverItem();
  if(overItem)
  {
    swapPositions( hiddenItem , overItem  , false);
  }
}

function moveRight()
{
  const hiddenItem = getHiddenItem();
  const leftItem = getLeftItem();
  if(leftItem)
  {
    swapPositions( hiddenItem , leftItem , true);
  }
}

function moveLeft()
{
  const hiddenItem = getHiddenItem();
  const rightItem = getRightItem();
  if(rightItem)
  {
    swapPositions( hiddenItem , rightItem , true );
  }
}


function swapPositions(item1 , item2 , xChanged)
{
  let aux = item1.position;
  item1.position = item2.position;
  item2.position = aux;

  if(xChanged === true)
  {
    let a = item1.x;
    item1.x = item2.x;
    item2.x = a;
  }
  else
  {
    let a = item1.y;
    item1.y = item2.y;
    item2.y = a;
  }
}

function getUnderItem()
{
  const hiddenItem = getHiddenItem();
  const isBottomEdge = getRow(hiddenItem.position) === size;
  if (isBottomEdge) 
  {
    return null
  }
  const underItem = getItemByPosition(  hiddenItem.position +size  );
  return underItem;
}



function getOverItem()
{
  const hiddenItem = getHiddenItem();
  const isTopEdge = getRow(hiddenItem.position) === 1;
  if (isTopEdge) 
  {
    return null
  }
  const overItem = getItemByPosition(  hiddenItem.position - size  );
  return overItem;
}


function getRightItem()
{
  const hiddenItem = getHiddenItem();
  const isRightEdge = getColumn(hiddenItem.position) === 3;
  if (isRightEdge) 
  {
    return null
  }
  const RightItem = getItemByPosition(  hiddenItem.position +1  );
  return RightItem;
}


function getLeftItem()
{
  const hiddenItem = getHiddenItem();
  const isLeftEdge = getColumn(hiddenItem.position) === 1;
  if (isLeftEdge) 
  {
    return null
  }
  const LeftItem = getItemByPosition(  hiddenItem.position -1  );
  return LeftItem;
}

function getItemByPosition(position)
{
  return items.find( (item)=>item.position === position );
}


function getHiddenItem()
{
  return items.find( (item)=>item.hidden === true );
}
