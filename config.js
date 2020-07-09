var game;
window.onload = function() {
 
    // configurações gerais do jogo
    let gameConfig = {
 
        // resolution and scale mode
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
       // game background color  -- 98FB98
       backgroundColor: '#000000',
 
       // scenes used by the game
       scene: [PlayGame]
       
    };
 
    // game constructor
    game = new Phaser.Game(gameConfig);
 
    // pure javascript to give focus to the page/frame
    window.focus()
}