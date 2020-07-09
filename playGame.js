class PlayGame extends Phaser.Scene{

    constructor()
    {
        super("PlayGame");
        this.itens;
        this.inimigos;
        this.personagem;
        this.passo;
        this.txtPontos;
        this.txtVidas;
        
        this.pontos;
        this.vidas;

        this.cursors;
        this.opcoesItens;
        

    }

    preload()
    {
        this.load.image('star', 'assets/star.png');
        this.load.image('rock', 'assets/rocha.png');
        this.load.spritesheet('personagem', 'assets/dude.png',{ frameWidth: 32, frameHeight: 48});

    }

    create()
    {
       this.pontos = 0;
       this.vidas = 2;
       this.opcoesItens = new Array("rock","star","star","star");        
        var chao = this.add.rectangle(0, 500, 800, 30, 0xFF8C00).setOrigin(0,0);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.existing(chao);
        this.passo = 160;
        
        chao.body.allowGravity = false;
        chao.body.setImmovable(true);
        const larguraRock = 55;
        const larguraStar = 24;
        
        
        /*
        for (let index = 0; index < 15; index++) {
            //gera um X aleatório dentro da área do jogo
            let qualitem = 
            let x = getRndInteger
            
        }
        */
       this.itens = this.physics.add.group({
        key: 'star',
        repeat: 11,
        collideWorldBounds: true,
       
        
    });
    
    this.itens.children.iterate(function (child) {
        
        child.x = Phaser.Math.Between(child.width, 800-child.width);
        child.y = Phaser.Math.Between(0, 30)
        child.body.onWorldBounds = true;
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
    
    });

    this.inimigos = this.physics.add.group({
        key: 'rock',
        repeat: 3,
        collideWorldBounds: true
        
    });
    
    this.inimigos.children.iterate(function (child) {
        child.x = Phaser.Math.Between(child.width, 800-child.width);
        child.y = Phaser.Math.Between(-50, 30)
        child.body.onWorldBounds = true;
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
    
    });
    this.physics.world.on('worldbounds', this.onWorldBounds);

        this.add.text(30, chao.y+60, "Pontos: ", {fontSize: '18px', fill: 'black'});
        this.txtPontos = this.add.text(120, chao.y+60, this.pontos, {fontSize: '18px', fill: 'blue'});

        this.add.text(530, chao.y+60, "Vidas: ", {fontSize: '18px', fill: 'black'});
        this.txtVidas = this.add.text(600, chao.y+60, this.vidas, {fontSize: '18px', fill: 'red'});

        //this.txtVidas = this.add.text(820, 20, "Vidas: " + vidas, {fontSize: '32px', fill: 'red'});

   
        
    
        this.personagem = this.physics.add.image(380, 400, 'personagem', 4);
        this.personagem.setCollideWorldBounds(true);
        this.physics.add.collider(this.personagem, chao);
        this.physics.add.overlap(this.personagem, this.itens,this.pegou,null, this);
        this.physics.add.overlap(this.personagem, this.inimigos,this.pegou,null, this);
   
    }

    update()
    {
        
        if(this.cursors.left.isDown){
            this.personagem.setVelocityX(this.passo*-1);
            
        } else if(this.cursors.right.isDown){
            this.personagem.setVelocityX(this.passo);
        } 
        else if(this.cursors.up.isDown){
            
            this.scene.restart();
        } else {

            this.personagem.setVelocityX(0);
            
        }
        
    }

    pegou(personagem, item)
    {
        item.disableBody(true, true);
        if(item.texture.key=="star")
        {
            this.pontos++;
            this.txtPontos.text = this.pontos;

            if (this.pontos==10) {
                this.add.text(200, 200, "Vc Venceu\nPressione a seta CIMA para jogar novamente", {fontSize: '22px', fill: 'orange'});
               
            }
           
       }
        else
        {
            this.vidas--;
            this.txtVidas.text = this.vidas;
            if(this.vidas==0)
            {
                this.add.text(200, 200, "Vc Perdeu\nPressione a seta CIMA para jogar novamente", {fontSize: '22px', fill: 'orange'});
                
         
            }
            
        }
        
        
    }

    
      sorteiaItem()
      {
        return this.opcoesItens[Math.floor(Math.random()*this.opcoesItens.length)];
      }

      onWorldBounds (child)
    {
        console.log(child.y)
        if(child.y>0)
        {
            child.x = Phaser.Math.Between(child.width, 800-child.width);
            child.y = 0;
        }
    }

    

}