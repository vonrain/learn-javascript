$(function () {
    var vm = new Vue({
        el: '#vm',
        data: {
            name: 'Robot',
            age: 15
        }
    });
    window.vm = vm;
});

function executeJs() {
    try {
        var code = $('#code').val();
        var fn = new Function('var vm = window.vm;\n' + code);
        fn();
    } catch (e) {}
    return false;
}