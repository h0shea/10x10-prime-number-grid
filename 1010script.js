let n = 0;
document.getElementById("ordinal").innerHTML = n;
m = 0;
primes = "";

function move(r)  {
    if (r == -1)    {
        n--;
    }
    else if (r == 1)    {
        n++;
    } else {
        n = n;
    }
    if (n != 0) {
        document.getElementById("previous").disabled = false;
    } else  {
        document.getElementById("previous").disabled = true;
    }
    document.getElementById("ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function enter()    {
    n = document.getElementById("input").value;
    if (n == "")    {
        n = 0;
    }
    if (n != 0) {
        document.getElementById("previous").disabled = false;
    } else  {
        document.getElementById("previous").disabled = true;
    }
    document.getElementById("ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function reset()    {
    n = 0;
    if (n == 0) {
        document.getElementById("previous").disabled = true;
    }
    document.getElementById("ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function random()    {
    n = Math.floor(Math.random()* (10000 - 0));
    if (n == 0) {
        document.getElementById("previous").disabled = true;
    } else  {
        document.getElementById("previous").disabled = false;
    }
    document.getElementById("ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function creategrid()    {
    let table = "";
    let list = "";
    let p = "0";
    let prime = [];
    m = n * 100 + 1;
    for (let i = 0; i < 10; i++)    { // vertical
        for (let i = 0; i < 10; i++)    { // horizontal
            let d = 2;
            let yn = "";
            const primecheck = [];

            do {
                if (m % d == 0) {
                    if (m == d)  {
                        d += 1;
                    } else  {
                        yn = "Y";
                        d += 1;
                        primecheck.push(yn);
                    }
                } else if (m % d !== 0) {
                    yn = "N";
                    d += 1;
                    primecheck.push(yn);
                } else if (m == d)  {
                    d += 1;
                }
            }
            while (d < (10*n)+100);

            if (primecheck.includes("Y"))    {
                list += "<td class=notprime onclick=number(" + m + ") style=font-size:23px;><font face=helvetica>" + m + "</font></td>";
                m = m + 1;
            } else if (m == 1)   {
                list += "<td class=notprime onclick=number(" + m + ") style=font-size:23px;><font face=helvetica>" + m + "</font></td>";
                m = m + 1;
            } else {
                list += "<td class=prime onclick=number(" + m + ")><b><font face=helvetica>" + m + "</font></b></td>";
                prime.push(m);
                m = m + 1;
                p++;
            }
        }
        table += "<tr>" + list + "</tr>";
        list = "";
    }
    document.getElementById("grid").innerHTML = table;
    document.getElementById("desc").innerHTML = "There are <b>" + p + " prime numbers</b> in this 10x10 grid";
    primes = prime.join(" ");
    console.log(primes);
}

function number(x)   {
    document.getElementById("base").innerHTML = "";
    document.getElementById("base").innerHTML += "<h1 align=center style=margin-bottom:4px;><font face=helvetica>Card\u2009#" + x + "</font></h1>";
    let f = 1;
    let nfact = 0;
    let g = x;
    m = x;
    const factors = [];
    const primefact = [];
    do  {
        if (x % f == 0) {
            factors.push(f);
            f++;
            nfact++;
        } else{
            f++;
        }
    }
    while (f <= x);
    let h = 2;
    while (h**2 <= g)   {
        if (g % h == 0) {
            primefact.push(h);
            g = g / h;
        } else {
            h += 1;
        }
    }
    if (g > 1) {
        primefact.push(g);
    }
    console.log(primefact.join(" * "));
    console.log(factors.join(" "));
    if (primes.includes(x) == true && x != 1 && x != 4 && x != 6 && x != 8 && x != 9) {
        document.getElementById("base").innerHTML += "<div class=box><p style=font-size:40px;margin:0px;color:white;background-color:red;><b><font face=helvetica>" + x + "</font></b></p>" +
        "<p align=left style=background-color:silver;margin:0px;padding:5px;><font face=arial><b>Number:   </b>Prime</font></p>" +
        "<p align=left style=background-color:white;margin:0px;padding:5px;><font face=arial><b>Factors:   </b>" + factors.join(", ") + "</font></p>" +
        "<p align=left style=background-color:silver;margin:0px;padding:5px;><font face=arial><b>Prime Factors:   </b> 1 * " + x + "</font></p></div>";
    } else if (x == 1) {
        document.getElementById("base").innerHTML += "<div class=box><p style=font-size:40px;margin:0px;><font face=helvetica>" + x + "</font></p>" +
        "<p align=left style=background-color:white;margin:0px;padding:5px;><font face=arial>The number 1 is neither a prime number nor a composite number because it doesnt satisfy the definitions of both categories. Prime numbers have exactly two distinct factors (which is 1 and itself), while composite numbers are greater than 1 and can be factored into smaller integers. Since 1 doesnt fit in these definitions, it falls outside the prime and composite classifications.</font></p></div>";
    } else {
        document.getElementById("base").innerHTML += "<div class=box><p style=font-size:40px;margin:0px;><font face=helvetica>" + x + "</font></p>" +
        "<p align=left style=background-color:silver;margin:0px;padding:5px;><font face=arial><b>Number:   </b>Composite</font></p>" +
        "<p align=left style=background-color:white;margin:0px;padding:5px;><font face=arial><b>Factors:   </b>" + factors.join(", ") + " (" + nfact + " factors)</font></p>" +
        "<p align=left style=background-color:silver;margin:0px;padding:5px;><font face=arial><b>Prime Factors:   </b>" + primefact.join(" * ") + "</font></p></div>";
    }
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("buttons").innerHTML ="<button onclick=back()>Back to grid</button>" 
}

function back() {
    document.getElementById("base").innerHTML = "";
    document.getElementById("base").innerHTML += "<h1 id=ordinal align=center style=margin-bottom:4px;><font face=helvetica>Grid #" + n + "</font></h1>"
    + "<table id=grid style=border: 3px blue solid; text-align: center; background-color: white;></table>"
    + "<p id=desc style=font-family:arial;margin:10px;></p>";
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("buttons").innerHTML += "<button onclick=move(-1) style=margin-right:16px; id=previous><<</button>" 
    + "<input type=insert id=input placeholder=Insert\u2009grid\u2009number..." + "></input>"
    + "<button onclick=enter() id=enterbtn>Enter</button>"
    + "<button onclick=move(1) style=margin-left:16px;>>></button>"
    + "<br>"
    + "<button onclick=reset() style=margin-top:10px;>Reset</button>"
    + "<button onclick=random() style=margin-top:10px;>Randomize Grid</button>";
    if (n != 0) {
        document.getElementById("previous").disabled = false;
    } else  {
        document.getElementById("previous").disabled = true;
    }
    creategrid();
}
