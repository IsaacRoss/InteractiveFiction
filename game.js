var game;
game.things = (function(){
  var items = {
    bat: {
      name: 'bat',
      effects: {
        'player_inventory': { 
          message: "<p>You picked up the bat!</p>",
          object: "addItem",
          subject: "deleteItem"
        },
        'dino': {
          message: "<p>You hit the dino with the bat</p><p>Now he's Angry.</p>",
          subject: 'deleteItem'
        },
        'empty': {
          message: "<p>You set the bat down over there. </p>",
          object: "addItem",
          subject: "deleteItem"
        }
      }
    },
    dino: {
      name: 'dino', 
      effects: {
        'player_inventory': {
          message: "<p>You can't move the dino...</p>"
        }
      }
    }
  };

  var get = function(name){
    return this.items[name];
  };
  var dropItemInto = function(itemNode, target){
    var effects,
      targetObject,
      sourceObject,
      sourceContext = itemNode.parentElement.parentElement.id;

    if(sourceContext !== target){
      var item = itemNode.firstChild.id;
      var itemObject = this.get(item);

      if(target === 'player_inventory'){
        effects = itemObject.effects[target];
      }else if(game.slide.getInventory(target)){
        effects = itemObject.effects[game.slide.getInventory(target)];
      }else{
        effects = itemObject.effects['empty'];
      }
      /*jshint -W018 */
      if(!!effects.object === true){
        if(target==='player_inventory'){
          targetObject = game.playerInventory;
        }else{
          targetObject = game.slide;
        }
        targetObject[effects.object](itemObject);
      }
      if(!!effects.subject === true){
        if(sourceContext === 'player_inventory'){
          sourceObject = game.playerInventory;
        }else{
          sourceObject = game.slide;
        }
        sourceObject[effects.subject](itemObject);
      }
      if(!!effects.message === true){
        game.slide.setText(effects.message);
      }
      game.screen.draw();
    }
  };
  return{
    items: items,
    get: get,
    dropItemInto: dropItemInto
  };
})();