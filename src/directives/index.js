export const imgerror = {
  // 指令对象
  inserted(el, binding, vnode) {
    console.log(el)
    console.log(binding)
    console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
