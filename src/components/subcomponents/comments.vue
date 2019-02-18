<template>
    <div class="comments-container">
        <h3>发表评论</h3>
        <textarea name="" id="" placeholder="请输入评论内容(少于120字)" maxlength="120" v-model="newComment"></textarea>
        <mt-button size="large" type="primary" @click="postComment">发表评论</mt-button>
        <div class="comments-content">
            <div class="comments-content-box" v-for="(item,index) in comments" :key="'comment' + index">
                <p class="users">第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataStr }} </p>
                <p class="text">{{ (item.content == '' | item.content == 'undefined')? '无评论内容':item.content }}</p>
            </div>

        </div>
        <mt-button size="large" type="danger" plain @click="getMoreComments">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "comments",
        data () {
            return {
                comments: [],
                pageIndex: 1,
                newComment: ''
            }
        },
        props: ['id'],
        created () {
            this.getComments();
        },
        methods: {
            getComments () {
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                    if (result.body.status === 0) {
                        this.comments = this.comments.concat(result.body.message);
                    } else {
                        Toast('评论加载失败');
                    }

                })
            },
            getMoreComments () {
                this.pageIndex ++;
                this.getComments();
            },
            postComment () {
                let newCommentContent = this.newComment.trim();
                if (newCommentContent.length === 0) {
                    return Toast('请输入评论内容');
                }
                this.$http.post('api/postcomment/' + this.id, { content: newCommentContent}).then(result => {
                    if (result.body.status === 0) {
                        let newComment = {
                            add_time: Date.now(),
                            content: newCommentContent,
                            user_name: '匿名用户'
                        };
                        this.comments.unshift(newComment) ;
                    } else {
                        Toast('评论提交失败');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .comments-container {
        padding-bottom: 5px;
        h3 {
            font-size: 18px;
            border-bottom: 2px solid #ccc;
            height: 30px;
            line-height: 25px;
        }
        textarea {
            font-size: 14px;
            margin: 0;
        }
        .comments-content {
            padding-top: 10px;
            .comments-content-box {
                .users {
                    background-color: #ccc;
                }
                .text {
                    text-indent: 10px;
                }
            }
        }
    }
</style>