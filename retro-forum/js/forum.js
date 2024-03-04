const loadData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    setTimeout(function () {
        displayData(data.posts)
    }, 2000)
}
const displayData = (posts) => {
    const contentSection = document.getElementById('content-section')
    contentSection.textContent = '';
    posts.forEach(post => {
        const textContainer = document.createElement('div')
        textContainer.innerHTML = `
        <div class="mb-6 bg-base-200 rounded-2xl h-[270px]">
        <div class="flex space-x-6 pt-6 pl-3 lg:pl-6">
        <div class="w-[25%] lg:w-[10%]">
        <div id="active-show" class="avatar mask mask-squircle relative">
        <img class="w-[72px]" src="${post?.image}"/>
          <p>${post.isActive ? '<div class="bg-green-500 w-4 h-4 rounded-full ml-12 absolute"></div>' : '<div class="bg-red-600 w-4 h-4 rounded-full ml-10 absolute"></div>'}</p>
        </div>
      </div>
            <div>
                <div class="flex space-x-4">
                    <p>#${post?.category}</p>
                    <p>Author : ${post?.author?.name}</p>
                </div>
                <h3 class="text-2xl font-bold">${post.title}</h3>
                <p class="py-6">${post?.description}</p>
                <div class="flex justify-between items-center">
                    <div class="flex space-x-3">
                        <div class="flex space-x-2 justify-center items-center">
                            <img src="images/massage.png" alt="">
                            <p>${post?.comment_count}</p>
                        </div>
                        <div class="flex space-x-2 justify-center items-center">
                            <img src="images/eye.png" alt="">
                            <p>${post?.view_count}</p>
                        </div>
                        <div class="flex space-x-2 justify-center items-center">
                            <img src="images/watch.png" alt="">
                            <p>${post?.posted_time} min</p>
                        </div>
                    </div>
                    <div>
                        <button onclick="readButtonHandler('${post.title.replace('\'', '')}',${post.view_count})"><img src="images/color-massage.png" alt=""></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;

        contentSection.appendChild(textContainer);
        toggleLoadingSpinner(false)
    });
};
let readCount = 0;
const readButtonHandler = (title, view_count) => {
    // console.log(view)
    const viewTitle = document.getElementById('view-title')
    const readingView = document.createElement('div');
    readingView.innerHTML = `
    <div id="view-title" class="flex justify-between items-center px-4 my-6">
    <p class="font-medium">${title}</p>
    <div class="flex">
        <img src="images/eye.png" alt="">
        <p>${view_count}</p>
    </div>
    `;
    viewTitle.appendChild(readingView)
    readCount = readCount + 1;
    document.getElementById('read-count').innerText = readCount;
}
const loadLatestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayLatestPost(data)
}
// latest post
const displayLatestPost = (posts) => {
    const latestSection = document.getElementById('latest-section')
    posts.forEach(post => {
        const latestPostContainer = document.createElement('div');
        latestPostContainer.innerHTML = `
        <div class="card card-compact lg:h-[482px] bg-base-100 shadow-xl my-4 lg:my-0">
        <figure><img src="${post?.cover_image}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <p><span class="mr-2"><i class="fa-regular fa-calendar"></i></span>${post?.author?.posted_date || 'No publish date'}</p>
            <h2 class="text-base font-bold">${post?.title}</h2>
            <p>${post?.description}</p>
            <div class="flex items-center space-x-4">
                <div class="avatar">
                    <div class="w-16 rounded-full">
                        <img src="${post?.profile_image}" />
                    </div>
                </div>

                <div>
                    <h2>${post?.author?.name}</h2>
                    <p>${post?.author?.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>
    </div>
        `;
        latestSection.appendChild(latestPostContainer);

    });
}
const searchContent = () => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('input-feild');
    const searchText = searchField.value;
    loadData(searchText);
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}



loadLatestPost();
searchContent();