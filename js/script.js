let jobInfoInterview = [];
let jobInfoReject = [];

const filterSectionIn = document.getElementById('filter-section-in');
const filterSectionRe = document.getElementById('filter-section-re');

const btnAll = document.getElementById('btn-all');
const btnInterview = document.getElementById('btn-interview');
const btnReject = document.getElementById('btn-reject');

const allJob = document.getElementById('all-job');
const secInterviewJob = document.getElementById('interview-job');
const rejectedJob = document.getElementById('rejected-job');

const jobCountAll  = document.getElementById('job-count-all');
const jobCountIn = document.getElementById('job-count-in');
const jobCountRe = document.getElementById('job-count-re'); 

function showHide(id) {
    btnAll.classList.remove('btn-1');
    btnInterview.classList.remove('btn-2');
    btnReject.classList.remove('btn-3');

    allJob.classList.add('hide');
    secInterviewJob.classList.add('hide');
    rejectedJob.classList.add('hide');

    jobCountAll.classList.add('hide');
    jobCountIn.classList.add('hide');
    jobCountRe.classList.add('hide');

    if (id == "btn-all"){
        btnAll.classList.add('btn-1');
        allJob.classList.remove('hide');
        jobCountAll.classList.remove('hide');
    }
    else if (id == "btn-interview"){
        btnInterview.classList.add('btn-2');
        secInterviewJob.classList.remove('hide');
        jobCountIn.classList.remove('hide');
    }
    else if (id == "btn-reject"){
        btnReject.classList.add('btn-3');
        rejectedJob.classList.remove('hide');
        jobCountRe.classList.remove('hide');
    }
}

function jobCountAv(){
    document.getElementById('total').innerText = allJob.children.length;
    jobCountAll.innerText = allJob.children.length;
    document.getElementById('interview').innerText = jobInfoInterview.length;
    document.getElementById('rejected').innerText = jobInfoReject.length;
}
jobCountAv()

document.querySelector('main').addEventListener('click', function(event){
    if (event.target.classList.contains('btn-in')){
        const parenNode = event.target.parentNode.parentNode;
        
        const companyName = parenNode.querySelector('h5').innerText;
        const position = parenNode.querySelector('.p1').innerText;
        const LocationTypeSalary = parenNode.querySelector('.p2').innerText;
        const viewNa = parenNode.querySelector('.na').innerText = 'APPLIED';
        const discription = parenNode.querySelector('.p3').innerText;

        parenNode.parentNode.classList.add('cng-card-in');
        parenNode.querySelector('.na').classList.add('applied-in');

        if (parenNode.parentNode.parentNode === filterSectionRe){
            const childen = filterSectionRe.querySelectorAll('.job-info h5')
            for (let ch of childen){
                if (ch.innerText == companyName){
                    ch.parentElement.parentElement.remove(); 
                }
            }
        }

        if (parenNode.parentNode.parentNode === filterSectionRe){
            viewNa = allJob.children.querySelectorAll('.na').innerText = 'APPL';
        }
        
        const jobInfo = {
            companyName,
            position,
            LocationTypeSalary,
            viewNa,
            discription
        }
        
        const itemFind = jobInfoInterview.find(cpname => cpname.companyName == jobInfo.companyName);
        if (!itemFind){
            jobInfoInterview.push(jobInfo);
        }
        
        jobInfoReject = jobInfoReject.filter(cpname => cpname.companyName != jobInfo.companyName);

        renderJobInfoInterview()
        jobCountAv()

        

        document.getElementById('re-div').classList.add('hide');
        secInterviewJob.appendChild(filterSectionIn);
        filterSectionIn.classList.remove('hide');
        filterSectionRe.classList.add('hide');
        jobCountIn.innerText = filterSectionIn.children.length + ' of ' + allJob.children.length;
        
    }
    else if (event.target.classList.contains('btn-re')){
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('h5').innerText;
        const position = parenNode.querySelector('.p1').innerText;
        const LocationTypeSalary = parenNode.querySelector('.p2').innerText;
        const viewNa = parenNode.querySelector('.na').innerText = 'REJECTED';
        const discription = parenNode.querySelector('.p3').innerText;

        parenNode.parentNode.classList.add('cng-card-re');
        parenNode.querySelector('.na').classList.add('applied-re');

        if (parenNode.parentNode.parentNode === filterSectionIn){
            const childen = filterSectionIn.querySelectorAll('.job-info h5')
            for (let ch of childen){
                if (ch.innerText == companyName){
                    ch.parentElement.parentElement.remove();
                }
            }
        }

        const jobInfo = {
            companyName,
            position,
            LocationTypeSalary,
            viewNa,
            discription 
        }
        
        const itemFind = jobInfoReject.find(cpname => cpname.companyName == jobInfo.companyName);
        if (!itemFind){
            jobInfoReject.push(jobInfo);
        }

        jobInfoInterview = jobInfoInterview.filter(cpname => cpname.companyName != jobInfo.companyName)

        jobCountAv()
        renderjobInfoReject()

        document.getElementById('re-div-re').classList.add('hide');
        rejectedJob.appendChild(filterSectionRe);
        filterSectionRe.classList.remove('hide');
        filterSectionIn.classList.add('hide');
        jobCountRe.innerText = filterSectionRe.children.length + ' of ' + allJob.children.length;
    }
    else if (event.target.classList.contains('delete')){
        const parenNode = event.target.parentNode.parentNode;
        parenNode.remove();
        filterSectionIn.remove()
        filterSectionRe.remove()
        jobCountAv()
    }
})

function renderJobInfoInterview(){
    for (infoCollet of jobInfoInterview){
        
        let isDobule = false;
        const allCompanyName = filterSectionIn.querySelectorAll('.job-info h5');
        for (let allH5 of allCompanyName){
            if (allH5.innerText === infoCollet.companyName){
                isDobule = true;
                break
            }
        }
        
        if (isDobule) {
            continue;
        }

        let div = document.createElement('div');
        div.className = 'job-card cng-card-in';
        div.innerHTML = `
            <div class="job-info">
                <h5>${infoCollet.companyName}</h5>
                <p class="p1">${infoCollet.position}</p>
                <p class="p2">${infoCollet.LocationTypeSalary}</p>
                <span class="na applied-in">${infoCollet.viewNa}</span>
                <p class="p3">${infoCollet.discription}</p>
                <div class="btn">
                    <button class="btn-in">INTERVIEW</button>
                    <button class="btn-re">REJECTED</button>
                </div>
            </div>
            <div>
                <button><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `

        filterSectionIn.appendChild(div);
    }
}

function renderjobInfoReject(){
    for (infoCollet of jobInfoReject){

        let isDobule = false; 
        const allCompanyName = filterSectionRe.querySelectorAll('.job-info h5');
        for (let allH5 of allCompanyName){
            if (allH5.innerText === infoCollet.companyName){
                isDobule = true;
                break
            }
        }
        
        if (isDobule) {
            continue;
        }

        let div = document.createElement('div');
        div.className = 'job-card cng-card-re';
        div.innerHTML = `
            <div class="job-info">
                <h5>${infoCollet.companyName}</h5>
                <p class="p1">${infoCollet.position}</p>
                <p class="p2">${infoCollet.LocationTypeSalary}</p>
                <span class="na applied-re">${infoCollet.viewNa}</span>
                <p class="p3">${infoCollet.discription}</p>
                <div class="btn">
                    <button class="btn-in">INTERVIEW</button>
                    <button class="btn-re">REJECTED</button>
                </div>
            </div>
            <div>
                <button><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `
        
        filterSectionRe.appendChild(div);
    }
}

/* নিচের code প্রথম এ লিখেছি পরে দেখি হয় না। 
কিন্তু পরবর্তীতে Facebook group থেকে জানতে পারি
 last conceptual video ছিল এই assignment এর উপর ।
পরবর্তীতে conceptual video থেকে GitHub resources দেখে
উপরের কোড করতে পারছি তাও
 মিলাতে পারি নি */
  
/* toggling option Create */
/* function showHide(id) {
    const btnOne = document.getElementById('btn-1');
    const btnTwo = document.getElementById('btn-2');
    const btnThree = document.getElementById('btn-3');

    const btnAll = document.getElementById('all-job');
    const btnInterview = document.getElementById('interview-job');
    const btnRejected = document.getElementById('rejected-job');
    btnAll.classList.add('hide')
    btnInterview.classList.add('hide')
    btnRejected.classList.add('hide')

    const removeClass = document.getElementById(id);
    removeClass.classList.remove('hide');
    
    if (id === 'all-job'){
        btnOne.classList.add('btn-1');
    }
    else {
        btnOne.classList.remove('btn-1')
    }
    if (id === 'interview-job'){
        btnTwo.classList.add('btn-2');
        const newCount = document.createElement('span');
        newCount.id = 'newNum';
        newCount.style.fontSize = '11px'
        newCount.textContent = jobInfoHold.length;
        document.getElementById('job-nu').appendChild(newCount);
        document.getElementById('job-count').classList.add('hide');
    }
    else {
        btnTwo.classList.remove('btn-2');
        document.getElementById('newNum').remove();
        document.getElementById('job-count').classList.remove('hide');
    }
    if (id === 'rejected-job'){
        btnThree.classList.add('btn-3');
    }
    else {
        btnThree.classList.remove('btn-3');
    }
} */

/* Interview button create */
 

/* function cardIn(id){
    const jobInfo = document.getElementById(id);
    const appled = jobInfo.querySelector('span');
    const buttonN = jobInfo.querySelector('.btn-in')

    const oldDiv = document.getElementById("re-div");
    oldDiv.classList.add('hide')

    jobInfoHold.push(jobInfo);

    jobInfo.classList.add('cng-card-in');
    appled.innerText = "APPLED"
    buttonN.disabled = true;
    
    const clone = jobInfo.cloneNode(true);
    const section = document.getElementById('interview-job');
    section.appendChild(clone);

    const view = document.getElementById("interview");
    const availableJob = document.getElementById("job-count");
    
    const viewN = parseInt(view.innerText);
    const availableJobN = parseInt(availableJob.innerText);

    let newView = viewN + 1;
    let newAvailableJob = availableJobN - 1;
    
    view.innerText = newView;
    availableJob.innerText = newAvailableJob;
    avJobCount.push(newAvailableJob);
}

/* Rejected Button create */
/* 
function cardRe(id){
    const jobInfo = document.getElementById(id);
    const appled = jobInfo.querySelector('span');
    const buttonRe = jobInfo.querySelector('.btn-re')

    const oldDiv = document.getElementById("re-div-re");
    oldDiv.classList.add('hide');

    jobInfoHold.push(jobInfo);

    jobInfo.classList.add('cng-card-re');
    appled.innerText = "REJECTED"
    buttonRe.disabled = true;
    
    const clone2 = jobInfo.cloneNode(true);
    const sectionN = document.getElementById('rejected-job');
    sectionN.appendChild(clone2);
    
    const reject = document.getElementById("rejected");
    const availableJob = document.getElementById("job-count");
    
    const rejectN = parseInt(reject.innerText);
    const availableJobN = parseInt(availableJob.innerText);

    let newReject = rejectN + 1;
    let newAvailableJob = availableJobN - 1;
    
    reject.innerText = newReject;
    availableJob.innerText = newAvailableJob;
    avJobCount.push(newAvailableJob);
} */