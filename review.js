
let count = 0;
let reviewsObj = {};

let root = document.getElementById("review-root");
let textarea = root.querySelector("#review");
let addBtn = root.querySelector("#add-btn");
addBtn.addEventListener("click", addReview);


function addReview() {
    if (textarea.value === "") {return};
    manuplateReview(count);
    count++;
}

const manuplateReview = (count) => {
    // can give agrument of likes and dislike if given by db
    let data = createFormate();
    reviewsObj[count] = data;
    reviewsObj[count].replies = {};
    reviewsObj[count].replyCount = 0;


    const ul = root.querySelector("#reviews");

    const li = document.createElement("li");

    const span0 = document.createElement("span");
    reviewsObj[count].review = textarea.value;
    textarea.value = "";
    span0.innerHTML = reviewsObj[count].review;
    li.appendChild(span0);

    const span1 = document.createElement("span");
    span1.innerHTML = reviewsObj[count].totalLikes();
    li.appendChild(span1);

    const btn1 = document.createElement("button");
    btn1.addEventListener("click", () => {
        reviewsObj[count].likeHandler();
        span1.innerHTML = reviewsObj[count].totalLikes();
        span2.innerHTML = reviewsObj[count].totalDislikes();
        reviewsObj[count].mylike ? btn1.querySelector("i").style.color = "yellow" : btn1.querySelector("i").style.color = "white";
        reviewsObj[count].mylike ? btn2.querySelector("i").style.color = "white" : false;
        //console.log(btn1.querySelector("i").style.color)

    });
    btn1.innerHTML = '<i class="fa fa-thumbs-up"></i>';
    li.appendChild(btn1);

    const span2 = document.createElement("span");
    span2.innerHTML = reviewsObj[count].totalDislikes();
    li.appendChild(span2);

    const btn2 = document.createElement("button");
    btn2.addEventListener("click", () => {
        reviewsObj[count].dislikeHandler();
        span1.innerHTML = reviewsObj[count].totalLikes();
        span2.innerHTML = reviewsObj[count].totalDislikes();
        reviewsObj[count].mydislike ? btn2.querySelector("i").style.color = "yellow" : btn2.querySelector("i").style.color = "white";
        reviewsObj[count].mydislike ? btn1.querySelector("i").style.color = "white" : false;
        //console.log(reviewsObj[count])
    });
    btn2.innerHTML = '<i class="fa fa-thumbs-down" ></i>';
    li.appendChild(btn2);

    const btn4 = document.createElement("button");
    btn4.addEventListener("click", () => {
        addBtn.removeEventListener("click", addReview);
        addBtn.innerHTML = "Submit Edit";
        btn4.disabled = true;
        textarea.value = reviewsObj[count].review;
        addBtn.addEventListener("click", (e) => {
            reviewsObj[count].review = textarea.value;
            textarea.value = "";
            span0.innerHTML = reviewsObj[count].review;
            addBtn.addEventListener("click", addReview);
            addBtn.innerHTML = "Add";
            btn4.disabled = false;
        }, { once: true })

    });
    btn4.innerHTML = "Edit";
    li.appendChild(btn4);

    const btn5 = document.createElement("button");
    btn5.addEventListener("click", () => {
        delete reviewsObj[count];
        ul.removeChild(li);
    });
    btn5.innerHTML = "Delete";
    li.appendChild(btn5);

    const ulReply = document.createElement("ul");
    
    const btn3 = document.createElement("button");
    btn3.innerHTML = "Reply";
    btn3.addEventListener("click", () => {
        replyHandler(data.replyCount++, reviewsObj[count].replies, ulReply, btn3);
        //console.log(liReply,ulReply);
        
    });
    li.appendChild(btn3);

    li.appendChild(ulReply);

    ul.appendChild(li);
}

function replyHandler(parentReplyCount, data, parentNode, replyBtn, count) {
    replyBtn.disabled = true;


    const litext = document.createElement("li");

    const textarea = document.createElement("textarea");
    litext.appendChild(textarea);

    const button = document.createElement("button");
    button.addEventListener("click", () => {
        // can give agrument of likes and dislike if given by db
        data[parentReplyCount] = createFormate();

        const span0 = document.createElement("span");
        data[parentReplyCount].reply = textarea.value;
        span0.innerHTML = data[parentReplyCount].reply;
        textarea.value = "";
        litext.appendChild(span0);


        const span1 = document.createElement("span");
        span1.innerHTML = data[parentReplyCount].totalLikes();
        litext.appendChild(span1);

        const btn1 = document.createElement("button");
        btn1.addEventListener("click", () => {
            data[parentReplyCount].likeHandler();
            span1.innerHTML = data[parentReplyCount].totalLikes();
            span2.innerHTML = data[parentReplyCount].totalDislikes();
            data[parentReplyCount].mylike ? btn1.querySelector("i").style.color = "yellow" : btn1.querySelector("i").style.color = "white";
            data[parentReplyCount].mylike ? btn2.querySelector("i").style.color = "white" : false;
            //console.log(data[parentReplyCount])
        });
        btn1.innerHTML = '<i class="fa fa-thumbs-up" ></i>';
        litext.appendChild(btn1);

        const span2 = document.createElement("span");
        span2.innerHTML = data[parentReplyCount].totalDislikes();
        litext.appendChild(span2);

        const btn2 = document.createElement("button");
        btn2.addEventListener("click", () => {
            data[parentReplyCount].dislikeHandler();
            span1.innerHTML = data[parentReplyCount].totalLikes();
            span2.innerHTML = data[parentReplyCount].totalDislikes();
            data[parentReplyCount].mydislike ? btn2.querySelector("i").style.color = "yellow" : btn2.querySelector("i").style.color = "white";
            data[parentReplyCount].mydislike ? btn1.querySelector("i").style.color = "white" : false;
            //console.log(data[parentReplyCount]);
        });
        btn2.innerHTML = '<i class="fa fa-thumbs-down"></i>';
        litext.appendChild(btn2);
        
        const btn3 = document.createElement("button");
        btn3.addEventListener("click", () => {
            btn3.disabled = true;
            const textareaEditLi = document.createElement("li");

            const textareaEdit = document.createElement("textarea");
            textareaEdit.value = data[parentReplyCount].reply;
            textareaEditLi.appendChild(textareaEdit);

            const textareaEditBtn = document.createElement("button");
            textareaEditBtn.innerHTML = "Submit Edit";
            textareaEditBtn.addEventListener("click", () => {
                data[parentReplyCount].reply = textareaEdit.value;
                span0.innerHTML = data[parentReplyCount].reply;
                textareaEdit.value = "";
                parentNode.removeChild(textareaEditLi);
                btn3.disabled = false;
            });
            textareaEditLi.appendChild(textareaEditBtn);

            parentNode.appendChild(textareaEditLi);
        });
        btn3.innerHTML = "Edit";
        litext.appendChild(btn3);

        const btn4 = document.createElement("button");
        btn4.addEventListener("click", () => {
            delete data[parentReplyCount];
            parentNode.removeChild(litext);
        });
        btn4.innerHTML = "Delete";
        litext.appendChild(btn4);

        litext.removeChild(textarea);
        litext.removeChild(button);
        replyBtn.disabled = false;

    });
    button.innerHTML = "Submit";
    litext.appendChild(button);


    parentNode.appendChild(litext);

    //grndParentNode.appendChild(parentNode);


    console.log(data);

    return parentNode;
}


function createFormate() {
    const data = {
        likes: 0,
        dislikes: 0,
        mylike: false,
        mydislike: false,
        totalLikes: function () {
            return this.likes + this.mylike;
        },
        totalDislikes: function () {
            return this.dislikes + this.mydislike;
        },


    }
    const handler = {
        likeHandler: function () {
            if (!this.mylike) {
                if (this.mydislike) {
                    this.mydislike = false;
                    this.mylike = true;
                } else {
                    this.mylike = true;
                }

            } else if (this.mylike) {
                this.mylike = false;
            }
        },
        dislikeHandler: function () {

            if (!this.mydislike) {
                if (this.mylike) {
                    this.mylike = false;
                    this.mydislike = true;
                } else {
                    this.mydislike = true;
                }

            } else if (this.mydislike) {
                this.mydislike = false;
            }

        }

    }
    return { ...data, ...handler };
}


