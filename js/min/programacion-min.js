function Pokemon(e,t,n,o,a){this.nombre=e,this.numero=t,this.vida=n,this.ataque=o,this.tipo=a}function inicio(){var e=new Pokemon("Foliat",1,100,20,"Hierba");foliat_nombre.textContent=e.nombre,foliat_numero.textContent=e.numero,foliat_vida.textContent=e.vida,foliat_ataque.textContent=e.ataque,foliat_tipo.textContent=e.tipo,foliat_imagen.innerHTML="<img src='images/pokemon_"+e.numero+".jpg'>";var t=new Pokemon("florabri",2,110,40,"Hierba, Aéreo");florabri_nombre.textContent=t.nombre,florabri_numero.textContent=t.numero,florabri_vida.textContent=t.vida,florabri_ataque.textContent=t.ataque,florabri_tipo.textContent=t.tipo,florabri_imagen.innerHTML="<img src='images/pokemon_"+t.numero+".jpg'>";var n=new Pokemon("Florresum",3,130,60,"Hierba, Aéreo");florresum_nombre.textContent=n.nombre,florresum_numero.textContent=n.numero,florresum_vida.textContent=n.vida,florresum_ataque.textContent=n.ataque,florresum_tipo.textContent=n.tipo,florresum_imagen.innerHTML="<img src='images/pokemon_"+n.numero+".jpg'>";var o=new Pokemon("Kidling",4,150,40,"Fuego");kidling_nombre.textContent=o.nombre,kidling_numero.textContent=o.numero,kidling_vida.textContent=o.vida,kidling_ataque.textContent=o.ataque,kidling_tipo.textContent=o.tipo,kidling_imagen.innerHTML="<img src='images/pokemon_"+o.numero+".jpg'>";var e=new Pokemon("Pyroat",5,160,60,"Fuego, Roca");pyroat_nombre.textContent=pyroat.nombre,pyroat_numero.textContent=pyroat.numero,pyroat_vida.textContent=pyroat.vida,pyroat_ataque.textContent=pyroat.ataque,pyroat_tipo.textContent=pyroat.tipo,pyroat_imagen.innerHTML="<img src='images/pokemon_"+pyroat.numero+".jpg'>";var e=new Pokemon("Flairees",6,180,90,"Hierba");flairees_nombre.textContent=flairees.nombre,flairees_numero.textContent=flairees.numero,flairees_vida.textContent=flairees.vida,flairees_ataque.textContent=flairees.ataque,flairees_tipo.textContent=flairees.tipo,flairees_imagen.innerHTML="<img src='images/pokemon_"+flairees.numero+".jpg'>";var e=new Pokemon("Aguade",7,150,25,"Agua");aguade_nombre.textContent=aguade.nombre,aguade_numero.textContent=aguade.numero,aguade_vida.textContent=aguade.vida,aguade_ataque.textContent=aguade.ataque,aguade_tipo.textContent=aguade.tipo,aguade_imagen.innerHTML="<img src='images/pokemon_"+aguade.numero+".jpg'>";var a=new Pokemon("Iguadium",8,180,80,"Agua, Lucha");iguadium_nombre.textContent=a.nombre,iguadium_numero.textContent=a.numero,iguadium_vida.textContent=a.vida,iguadium_ataque.textContent=a.ataque,iguadium_tipo.textContent=a.tipo,iguadium_imagen.innerHTML="<img src='images/pokemon_"+a.numero+".jpg'>";var i=new Pokemon("Aguanaut",9,250,100,"Agua, Lucha");aguanaut_nombre.textContent=i.nombre,aguanaut_numero.textContent=i.numero,aguanaut_vida.textContent=i.vida,aguanaut_ataque.textContent=i.ataque,aguanaut_tipo.textContent=i.tipo,aguanaut_imagen.innerHTML="<img src='images/pokemon_"+i.numero+".jpg'>";var r=new Pokemon("Harpee",10,100,20,"Normal, Aéreo");harpee_nombre.textContent=r.nombre,harpee_numero.textContent=r.numero,harpee_vida.textContent=r.vida,harpee_ataque.textContent=r.ataque,harpee_tipo.textContent=r.tipo,harpee_imagen.innerHTML="<img src='images/pokemon_"+r.numero+".jpg'>";var m=new Pokemon("aquilor",11,120,40,"Normal, Aéreo");aquilor_nombre.textContent=m.nombre,aquilor_numero.textContent=m.numero,aquilor_vida.textContent=m.vida,aquilor_ataque.textContent=m.ataque,aquilor_tipo.textContent=m.tipo,aquilor_imagen.innerHTML="<img src='images/pokemon_"+m.numero+".jpg'>"}for(var myLinks=document.getElementsByClassName("numnom"),i=0;i<myLinks.length;i++)myLinks[i].addEventListener("touchstart",function(){this.className="hover"},!1),myLinks[i].addEventListener("touchend",function(){this.className=""},!1);if("standalone"in window.navigator&&window.navigator.standalone){var noddy,remotes=!1;document.addEventListener("click",function(e){for(noddy=e.target;"A"!==noddy.nodeName&&"HTML"!==noddy.nodeName;)noddy=noddy.parentNode;"href"in noddy&&-1!==noddy.href.indexOf("http")&&(-1!==noddy.href.indexOf(document.location.host)||remotes)&&(e.preventDefault(),document.location.href=noddy.href)},!1)}