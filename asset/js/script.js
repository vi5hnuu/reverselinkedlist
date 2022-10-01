
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


