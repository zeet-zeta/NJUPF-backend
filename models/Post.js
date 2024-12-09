class Post {
    constructor(title, author, content, createdAt, images) {
        this.title = title;
        this.author = author;
        this.content = content;
        this.createdAt = createdAt;
        this.images = images;
    }
}

module.exports = Post;