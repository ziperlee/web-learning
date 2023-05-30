// 要运行此站点，你必须运行一个本地 web 服务器，因为 file:// URLs 不允许加载 workers。参考我们的设置一个本地测试服务器的指导。完成后，你应该可以点击 "Generate primes" 并且使你的主页面保持响应。 如果你在创建和运行这个样例的过程中有疑问，你可以在 https://github.com/mdn/learning-area/blob/main/javascript/asynchronous/workers/finished 查看完成后的版本，并且在 https://mdn.github.io/learning-area/javascript/asynchronous/workers/finished 进行在线尝试。

// 在 "generate.js" 中创建一个新的 worker
const worker = new Worker('./generate.js');

// 当用户点击 "Generate primes" 时，给 worker 发送一条消息。
// 消息中的 command 属性是 "generate", 还包含另外一个属性 "quota"，即要生成的质数。
document.querySelector('#generate').addEventListener('click', () => {
    const quota = document.querySelector('#quota').value;
    worker.postMessage({
        command: 'generate',
        quota: quota
    });
});

// 当 worker 给主线程回发一条消息时，为用户更新 output 框，包含生成的质数（从 message 中获取）。
worker.addEventListener('message', message => {
    document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
    document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
    document.location.reload();
});

