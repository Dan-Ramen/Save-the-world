//////////
// Establishing the Ship class
//////////
class Ship {
    constructor() {
        this.hullHp = 0;
        this.firepower = 0;
        this.accuracy = 0;
    }
    attack(){
    }
}

//////////
// Howdy player sub-class !
//////////
class heroShip extends Ship {
    constructor(name){
        super();
        this.name = name;
        this.hullHp = 20
        this.firepower = 5
        this.accuracy = .7
        }
        attack(alienShip){
            alienShip.hullHp -= this.firepower;
        }
}

//////////
// Alien sub-class, welcome!
//////////
class alienShip extends Ship {
    constructor(){
        super();
        this.name = 'Zeta Invader'
        this.hullHp = Math.floor(Math.random() * 4) + 3;
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    }
    attack(heroShip){
        heroShip.hullHp -= this.firepower;
    }
    
}

// player object is an instance of the player sub-class
const player = new heroShip('USS Assembly')

// creating the minimum 6 enemiesby grouping them into a fleet array!
let alienFleet = []
for (let i = 0; i < 6; i++){
    alienFleet.push(new alienShip)
}

///////////
// Element codes for DOM manipulation && Floating Variables
///////////
//Flag to notify turns
let flag = false 
//Attack Button
const attackBtn = document.querySelector('#attack')

//Continue button
const contBtn = document.querySelector('#cont')

//Prompt Box
const prompt = document.querySelector('.promptBox')

//Player stats box
const pStats = document.querySelector('.playerStats')
pStats.setAttribute('style', 'white-space: pre;')

//Alien stats box
const aStats = document.querySelector('.enemyStats')
aStats.setAttribute('style', 'white-space: pre;')

//Round # box
const round = document.querySelector('.roundBox')
let roundNumber = 1
round.textContent = `Wave ${roundNumber}`


//////////
// The Gameplay Loop
//////////

//As soon as the page loads:
document.addEventListener('DOMContentLoaded', function(evt) {
    let sign = window.prompt('Would you like to play a game? (Type "yes" or "no")')
    if (sign.toLowerCase() === 'no'){
        alert('see ya later stinky!')
        window.close();
    }else if(sign.toLowerCase() === 'yes'){
        alert('Pog ! Er- I mean, let\'s continue shall we!');
        alert('Earth has been attacked by a Zetan Invaders from the Zeta-G3 System! You are the captain of the USS Assembly, on a mission to destroy every last alien ship. Battle the aliens as you try to destroy them with your sometimes unreliable lasers.');

        //These update page visuals/text
        pStats.textContent = 'Hull : 20 \r\n';
        pStats.textContent += 'Firepower : 5 \r\n';
        pStats.textContent += 'Accuracy : 0.7';
        aStats.textContent = `Hull : -- \r\n`;
        aStats.textContent += `Firepower : -- \r\n`;
        aStats.textContent += `Accuracy : --`;
        prompt.textContent = 'Captain! 6 Zetan ships incoming! \r\n';
        prompt.textContent += '(Press "Continue" to start)'
        }
});

    //Continue button
    contBtn.addEventListener('click', function(evt){
        round.innerHTML = `Wave 1 : Player Turn`
        prompt.textContent = `The first Zetan ship is closing in! \r\n`;
        prompt.textContent += 'Will you Attack or Retreat?'
        flag = true;
        console.log('Clicked')
});
        //Attack button
        attackBtn.addEventListener('click', function(evt){

            //Loops thru turns until there is no more aliens left (theoretically)
            for(let i = 6; alienFleet.length > 0; i--){

            //Player turn
            if(flag === true){
                console.log('Player Turn')

                // Player hitting an alien ship
                if(Math.random() < player.accuracy){
                    player.attack(alienFleet[0]);
                    aStats.textContent = `Hull : ${alienFleet[0].hullHp} \r\n`;
                    aStats.textContent += `Firepower : ${alienFleet[0].firepower} \r\n`;
                    aStats.textContent += `Accuracy : ${alienFleet[0].accuracy}`;
                    prompt.textContent = `You hit ${alienFleet[0].name}! They have ${alienFleet[0].hullHp}HP left!`;
                    console.log(`You hit ${alienFleet[0].name}! They have ${alienFleet[0].hullHp}HP left!`);
                    flag = false;

                        // Player killing an alien ship
                        if(alienFleet[0].hullHp <= 0){
                            prompt.textContent = `${alienFleet[0].name} has been de-comissioned! OO-RAH!`
                            console.log(`${alienFleet[0].name} has been de-comissioned! OO-RAH!`);
                            alienFleet.shift();
                            round.textContent = `Wave ${roundNumber++}`
                            flag = false;
                        };

                //Player hit missed
                }else if(Math.random() > player.accuracy){
                    prompt.textContent = "You missed! Re-calibrating heads-up display!"
                    console.log('You missed! Re-calibrating heads-up display!');
                    flag = false;
                };
            };

            //Alien turn
            if(flag === false){
                round.textContent = `Wave ${roundNumber} : Zetan Attack`
                console.log('Alien Turn')

                // Alien hit registering
                if(Math.random() < alienFleet[0].accuracy) {
                    alienFleet[0].attack(player);
                    pStats.textContent = `Hull : ${player.hullHP} \r\n`;
                    pStats.textContent += 'Firepower : 5 \r\n';
                    pStats.textContent += 'Accuracy : 0.7';
                    console.log(`You have been hit! Your hull integrity has dropped to ${player.hullHp}!`);
                    flag = true

                    // Player killed by alien
                    if(player.hullHp <= 0){
                        prompt.textContent = 'You Lose. \r\n';
                        prompt.textContent += `The Zetans destroyed the ${player.name}..`
                        console.log(`${player.name} this is ground support do you read!...we lost ${player.name}...`)
                        break;
                    };

            //Alien hit missed
            }else if(Math.random() > alienFleet[0].accuracy){
                prompt.textContent = `The ${alienFleet[0]} missed their attack!`
                console.log(`The ${alienFleet[0]} missed their attack!`)
                flag = true
            };
            };

                // win condition text
                if(alienFleet.length === 0){
                    prompt.textContent = "You won!"
                    console.log('The enemy invasion has been fought off! ...for now....');
                    break;
                };
            };
        });