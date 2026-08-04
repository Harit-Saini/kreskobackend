const Blog = require("../models/Blog");

// 👉 Admin upload blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const image = req.file ? req.file.filename : null;

    const blog = new Blog({
      title,
      description,
      image,
    });

    await blog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👉 User get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👉 Single blog
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👉 Delete (admin)
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};