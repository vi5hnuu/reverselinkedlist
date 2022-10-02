////////////////
window.addEventListener('load', (evnt) => {
    changeGridDim()
})
window.addEventListener('resize', (evnt) => {
    changeGridDim()
})

//[same as mediaQuery] at 900 650 400
function changeGridDim() {
    const nodes = document.querySelector('.nodes')
    const windowWidth = parseInt(window.document.body.clientWidth)
    console.log(windowWidth);

    const dimes = nodes.getBoundingClientRect()
    const cmpStules = window.getComputedStyle(nodes);
    const scrollBarWidth = dimes.width - nodes.clientWidth
    // console.log(cmpStules);
    let totalCols = 10
    if (windowWidth <= 400) {
        totalCols = 4
    }
    else if (windowWidth <= 650) {
        totalCols = 6
    }
    else if (windowWidth <= 900) {
        totalCols = 8
    }


    const colWidth = (dimes.width - scrollBarWidth - cmpStules.padding.split('px', 1)[0] * 2) / totalCols
    console.log(colWidth);
    nodes.style['grid-template-columns'] = `repeat(${totalCols},${colWidth}px)`
    nodes.style['grid-auto-rows'] = `${colWidth}px`


    //////onload and onchangeOfWiwndown size
    changeNodesSize()

}
function changeNodesSize() {
    const nodes = document.querySelector('.nodes')
    const allFullNodes = nodes.children
    if (allFullNodes.length > 2) {//exclude 1 and last child
        document.querySelectorAll('.node').forEach((node) => {
            node.style.height = `${node.getBoundingClientRect().width}px`
        })
    }
}
////////////////


const addNodes = document.querySelector('.btn-addNodes')
const backdrop = document.querySelector('.backdrop')
const submitBtn = document.querySelector('.btn-submit')
const btnReverse = document.querySelector('.btn-reverse')
const btnReset = document.querySelector('.btn-reset')


function toggleBackdrop() {
    const backdrop = document.querySelector('.backdrop')
    backdrop.classList.toggle('hidden')
}
function toggleInputModal() {
    const modal = document.querySelector('.modal')
    modal.classList.toggle('hidden')
}
function getValsArray(valsStr) {
    return valsStr.split(' ').map(strVal => {
        return parseFloat(strVal)
    });
}
function clearInputs() {
    const nodeCount = document.getElementById('nodeCount')
    const nodeValues = document.getElementById('nodeValues')
    nodeCount.value = ''
    nodeValues.value = ''
}
btnReset.addEventListener('click', () => {
    const nodesContainer = document.querySelector('.nodes')
    const nodes = document.querySelectorAll('.full-node')
    const len = nodes.length
    for (let i = 1; i < len - 1; i++) {
        nodesContainer.removeChild(nodes[i])
    }
    enableRevButton()
})
submitBtn.addEventListener('click', () => {
    // const nodeCount = document.getElementById('nodeCount')
    const nodeValues = document.getElementById('nodeValues')
    const nodeValueStr = nodeValues.value
    const vals = getValsArray(nodeValueStr)
    const nodesContainer = document.querySelector('.nodes')
    vals.forEach(val => {
        const fullNode = `
                <div class="full-node">
                    <div class="node">
                        ${val}
                    </div>
                    <p class="link">&rarr;</p>
                </div>
        `
        nodesContainer.lastElementChild.insertAdjacentHTML('beforeBegin', fullNode)
    });
    toggleInputModal()
    toggleBackdrop()
    clearInputs()
    enableRevButton()
    changeNodesSize()
    //show toolTip
    const toolTip = document.querySelector('.toolTip')
    toolTip.classList.toggle('hidden')
    setTimeout(() => {
        toolTip.classList.toggle('hidden')
    }, 5000)
})

function disableRevButton() {
    const btnRev = document.querySelector('.btn-reverse')
    btnRev.disabled = true
    btnRev.classList.remove('hover')
}

function enableRevButton() {
    const btnRev = document.querySelector('.btn-reverse')
    btnRev.disabled = false
    btnRev.classList.add('hover')
}
btnReverse.addEventListener('click', () => {
    disableRevButton()
    const nodesContainer = document.querySelector('.nodes')
    const fullNodesRefs = document.querySelectorAll('.full-node')//not live
    for (let i = fullNodesRefs.length - 2; i >= 1; i--) {
        const curNode = fullNodesRefs[i]
        nodesContainer.lastElementChild.insertAdjacentElement('beforeBegin', curNode)
    }

})

addNodes.addEventListener('click', () => {
    toggleBackdrop()
    toggleInputModal()
})

backdrop.addEventListener('click', () => {
    toggleInputModal()
    toggleBackdrop()
})


