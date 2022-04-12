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
  console.log(items);
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
}



function moveUp()
{
  const hiddenItem = getHiddenItem();
  const underItem = getUnderItem();
  if(underItem)
  {

  }
}

function moveDown()
{
  const hiddenItem = getHiddenItem();
  const overItem = getOverItem();
  if(overItem)
  {

  }
}

function moveRight()
{
  const hiddenItem = getHiddenItem();
}

function moveLeft()
{

}



























function getHiddenItem()
{
  return items.find( (item)=>item.hidden === true );
}
