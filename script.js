if (localStorage.getItem("cps") == null) {
        var cps=0;
        var claps=0;

        var minions = [
                { id: "a0", name: "Mariachis", cost: 10, cps: 0.1, owned: 0 },
                { id: "a1", name: "Ours", cost: 100, cps: 1, owned: 0 },
                { id: "a2", name: "Donald Trump", cost: 500, cps: 5, owned: 0 },
                { id: "a3", name: "BonGocat", cost: 6000, cps: 15, owned: 0 },
                { id: "a4", name: "Patoche", cost: 15000, cps: 25, owned: 0 },
                { id: "a5", name: "Singe", cost: 50000, cps: 50, owned: 0 },
                { id: "a6", name: "Dragon", cost: 200000, cps: 200, owned: 0 },
                { id: "a7", name: "Dumbo", cost: 500000, cps: 500, owned: 0 }
        ];
        var puissance_clap=1;
        var total_minions=0;
        var son=1;
        document.querySelector(".bouton_son").visibility= "hidden";
} else { 
        var cps=JSON.parse(localStorage.getItem("cps"));
        var claps=JSON.parse(localStorage.getItem("claps"));
        var minions =(JSON.parse(localStorage.getItem("minions")));
        var puissance_clap=(JSON.parse(localStorage.getItem("puissance_clap")));
        var total_minions=JSON.parse(localStorage.getItem("total_minions"));
        if (minions[0]['owned']!=0){
                var son=1;
                gestion_son();
        }
};
var time=0;

function addClap() {
        claps+=puissance_clap;
        document.querySelector("#add").style.animation="bounce 0.3s"; 
        setTimeout(function(){ document.querySelector("#add").style.animation="";},300); 
        actualise();
}

function addCps(){
        claps +=cps;
        actualise();
}

function addMinion(id){
        minions.forEach(minion => {
                if (minion['id']==id) {
                        claps -= minion['cost'];
                        minion['cost']*=1.15;
                        minion['owned']+=1;
                        total_minions+=1;
                        if (minion['owned']==25 
                        || minion['owned']==50 
                        || minion['owned']==100 
                        || minion['owned']==250 
                        || minion['owned']==1000 ){
                                minion['cps']*=2;
                        }
                        if (minion['id']=='a0' && minion['owned']==1 ){
                                var soon=document.querySelector(".bouton_son");
                                ajoutAtribut(soon,"src","image/son.png");
                                soon.style.visibility= "visible";
                                document.querySelector("#musique").play();

                        }
                }
        });
        if (total_minions%20 == 0) {
                puissance_clap*=2;
                displayPowerClap();
        }
        displayTotalMinions()
        actualise();
}

function créeStore() {
        store=document.querySelector(".store");
        minions.forEach(minion => {
                achete = créeBalise(store,"button","buy")
                ajoutAtribut(achete,"id",minion['id']);
                ajoutAtribut(achete,"onclick","addMinion('"+minion['id']+"')"); 
                ajoutAtribut(achete,"class","bouton_achat pointer"); 
                créeBalise(achete,"div","name","prénom: "+minion['name']);
                créeBalise(achete,"div","cost","cout: "+minion['cost']+" claps");
                créeBalise(achete,"div","cps","claps/sec: "+minion['cps']);
                créeBalise(achete,"div","owned","possede: "+minion['owned']);
                if (minion['cost']>claps) {
                        achete.style.pointerEvents= "none";
                        achete.style.backgroundColor="red";
                } else {
                        achete.style.pointerEvents= "auto";
                        achete.style.backgroundColor="green";
                }
        });
}

function displayClaps(){
        document.querySelector("#clap").innerHTML="Tu as "+claps.toFixed(1)+" claps !";
}

function displayCps(){
        document.querySelector("#Cps").innerHTML="Tu as "+cps.toFixed(1)+" claps par secondes !";
}

function displayPowerClap() {
        document.querySelector("#power_clap").innerHTML="Ton clap manuel vaut "+puissance_clap+" click par seconde !";
}

function displayTotalMinions() {
        document.querySelector("#total_minions").innerHTML="Tu as "+total_minions+" minions au total !";
}

function getCps() {
        cps=0;
        minions.forEach(minion => {
                cps+=minion['cps']*minion['owned'];          
        });
}


function actualiseStore() {
        minions.forEach(minion => {
                achete= document.querySelector("#"+minion['id']);
                change_texte(achete.childNodes[0],minion['name']);
                change_texte(achete.childNodes[1],minion['cost'].toFixed(1)+" claps");
                change_texte(achete.childNodes[2],"claps/sec: "+minion['cps']);
                change_texte(achete.childNodes[3],"Possedé: "+minion['owned']);
                if (minion['cost']>claps) {
                        achete.style.pointerEvents= "none";
                        achete.style.backgroundColor="red";
                } else {
                        achete.style.pointerEvents= "auto";
                        achete.style.backgroundColor="green";
                }
                if (minion['owned']==0) {
                        document.querySelector("."+minion['id']).style.visibility= "hidden";
                } else {
                        document.querySelector("."+minion['id']).style.visibility= "visible"; 
                }
        });
}

function ajoutAtribut(element,name,value) {
        element.setAttribute(name,value);
}

function change_texte(element,texte) {
        element.innerHTML=texte;
}

function reset() {
        localStorage.clear();
        cps=0;
        claps=0;
        minions = [
                { id: "a0", name: "Mariachis", cost: 10, cps: 0.1, owned: 0 },
                { id: "a1", name: "Ours", cost: 100, cps: 1, owned: 0 },
                { id: "a2", name: "Donald Trump", cost: 500, cps: 5, owned: 0 },
                { id: "a3", name: "Bongo Cat", cost: 6000, cps: 15, owned: 0},
                { id: "a4", name: "Patoche", cost: 15000, cps: 25, owned: 0 },
                { id: "a5", name: "Singe", cost: 50000, cps: 50, owned: 0 },
                { id: "a6", name: "Dragon", cost: 200000, cps: 200, owned: 0 },
                { id: "a7", name: "Dumbo", cost: 500000, cps: 500, owned: 0 }
        ];
        puissance_clap=1;
        total_minions=0;
        son=1;
        document.querySelector("#musique").pause();
        document.querySelector("#musique").currentTime = 0;
        document.querySelector(".bouton_son").style.visibility="hidden";
        actualise()
        displayPowerClap()
        displayTotalMinions()
}

function gestion_son(){
        var soon=document.querySelector(".bouton_son");
        if (son==1){
                son=0;
                document.querySelector("#musique").pause();
                ajoutAtribut(soon,"src","image/no_son.png");
        } else {
                son=1;
                document.querySelector("#musique").play();
                ajoutAtribut(soon,"src","image/son.png");
        }
}

function sauvegarde() {
        localStorage.setItem("cps",cps);
        localStorage.setItem("minions", JSON.stringify(minions));
        localStorage.setItem("puissance_clap",puissance_clap);
        localStorage.setItem("claps",claps);
        localStorage.setItem("total_minions",total_minions);

}

function créeBalise(parent,name,classe="",texte="") {
        var newBalise = document.createElement(name);
        newBalise.classList.add(classe);
        newBalise.innerHTML=texte;
        parent.appendChild(newBalise);
        return newBalise;
}

function actualise(){
        getCps()
        displayClaps()
        displayCps()
        actualiseStore()
        sauvegarde()
}

créeStore()
actualise()
displayTotalMinions()
displayPowerClap()
setInterval(addCps,1000);





// achete.style.pointerEvents= "none";