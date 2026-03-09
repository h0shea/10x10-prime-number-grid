let n = 0;
document.getElementById("table_ordinal").innerHTML = n;
m = 0;
primes = "";

function move(r)  {
    if (r == -1) {
        n--;
    } else if (r == 1) {
        n++;
    } else {
        n = 0;
    }

    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function enter()    {
    n = document.getElementById("input").value;
    if (n == "")    {
        n = 0;
    }
    
    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function reset()    {
    n = 0;
    if (n == 0) {
        let previousbtn = document.getElementById("previous");
        previousbtn.style.visibility = 'hidden';
    }
    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function random(a, b)    {
    n = Math.floor(Math.random(a) * (b - 0));
    
    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function primeFactor(n) {
    let primefact = [];
    let p = 2;
        
    while (p**2 <= n)   {
        if (n % p == 0) {
            primefact.push(p);
            n = n / p;
        } else {
            p += 1;
        }
    }

    primefact.push(n);

    return primefact; 
}

function creategrid()    {
    let table = "";
    let list = "";
    let p = "0";
    let prime = [];
    m = n * 100 + 1;
    if (n != 0) {
        let previousbtn = document.getElementById("previous");
        previousbtn.style.visibility = 'visible';
    } else  {
        let previousbtn = document.getElementById("previous");
        previousbtn.style.visibility = 'hidden';
    }
    for (let i = 0; i < 10; i++)    {
        for (let i = 0; i < 10; i++)    {
            
            if (primeFactor(m).length != 1 || primeFactor(m) == 1)    {
                list += "<td class=notprime onclick=number(" + m + ")><font face=helvetica>" + m + "</font></td>";
                m++;
            } else if (m > 9007199254740992) {
                list += "<td class=notprime><font face=helvetica>Goodbye</font></td>";
            } else {
                list += "<td class=prime onclick=number(" + m + ")><b><font face=helvetica>" + m + "</font></b></td>";
                prime.push(m);
                m++;
                p++;
            }
        }

        table += "<tr>" + list + "</tr>";
        list = "";
    }

    document.getElementById("grid").innerHTML = table;
    document.getElementById("numberofprimes").innerHTML = "There are <b>" + p + " prime numbers</b> in this 10x10 grid";
    primes = prime.join(" ");

    
    
    let primecells = document.getElementsByClassName('prime');
    let nonprimecells = document.getElementsByClassName('notprime');


    if (n > 999999) {
        for (let i = 0; i < primecells.length; i++) {
            primecells[i].style.fontSize = "1.25em";
        }
        for (let i = 0; i < nonprimecells.length; i++) {
            nonprimecells[i].style.fontSize = "1.25em";
        }
    } else if (n > 99999999) {
        for (let i = 0; i < primecells.length; i++) {
            primecells[i].style.fontSize = "0.75em";
        }
        for (let i = 0; i < nonprimecells.length; i++) {
            nonprimecells[i].style.fontSize = "0.75em";
        }
    } else {
        for (let i = 0; i < primecells.length; i++) {
            primecells[i].style.fontSize = "1.5em";
        }
        for (let i = 0; i < nonprimecells.length; i++) {
            nonprimecells[i].style.fontSize = "1.5em";
        }
    }
}

function number(x)   {
    document.getElementById("desc").style.display = "flex";
    document.getElementById("desc_ordinal").innerHTML = "Card #" + x;

    const factors = [];

    for (let i = 1; i <= Math.sqrt(x); i++) {
        if (x % i == 0) {
            factors.push(i);
        }
    }

    let factleng = factors.length;

    for (let i = 1; i <= factleng; i++) {
        factors.push(x / factors[factleng - i]);
    }

    if (factors[factleng - 1] == factors[factleng]) {
        factors.splice(factleng, 1);
    }

    primeFactor(x);
    document.getElementById("n").innerHTML = x;
    document.getElementById("main").style.display = "none";
    if (primeFactor(x).length == 1) {
        document.getElementById("n").style.backgroundColor = "Red";
        document.getElementById("n").style.color = "White";
        document.getElementById("n").style.fontWeight = "Bold";
        document.getElementById("numbertype").innerHTML = "<b>Number:</b> Prime";
        document.getElementById("factors").innerHTML = "<b>Factors: </b>" + factors.join(", ") + " (" + factors.length + " factors)"; 
        document.getElementById("primefactors").innerHTML = "<b>Prime Factors: </b>" + primeFactor(x).join(" * ");
        document.getElementById("numbertype").style.backgroundColor = "Silver";
        document.getElementById("factors").style.display = "block";
        document.getElementById("primefactors").style.display = "block"; 
    } else if (x == 1)  {
        document.getElementById("n").style.backgroundColor = "White";
        document.getElementById("n").style.color = "Black";
        document.getElementById("n").style.fontWeight = 400;
        document.getElementById("numbertype").innerHTML = "The number 1 is neither a prime number nor a composite number because it doesnt satisfy the definitions of both categories. Prime numbers have exactly two distinct factors (which is 1 and itself), while composite numbers are greater than 1 and can be factored into smaller integers. Since 1 doesnt fit in these definitions, it falls outside the prime and composite classifications."
        document.getElementById("numbertype").style.backgroundColor = "White";
        document.getElementById("factors").style.display = "none";
        document.getElementById("primefactors").style.display = "none";
    } else  {
        document.getElementById("n").style.backgroundColor = "White";
        document.getElementById("n").style.color = "Black";
        document.getElementById("n").style.fontWeight = 400;
        document.getElementById("numbertype").innerHTML = "<b>Number:</b> Composite";
        document.getElementById("factors").innerHTML = "<b>Factors: </b>" + factors.join(", ") + " (" + factors.length + " factors)"; 
        document.getElementById("primefactors").innerHTML = "<b>Prime Factors: </b>" + primeFactor(x).join(" * "); 
        document.getElementById("numbertype").style.backgroundColor = "Silver";
        document.getElementById("factors").style.display = "block";
        document.getElementById("primefactors").style.display = "block";
    }
}

function back() {
    document.getElementById("main").style.display = "flex";
    document.getElementById("desc").style.display = "none";
    creategrid();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { enter(); }
    if (event.key === "ArrowLeft") { move(-1); }
    if (event.key === "ArrowRight") { move(1); }
    if (event.key === "r" || event.key === "R") { reset(); }
    if (event.key === " ") { random(0, 10000); }
});
