const express = require('express');
const router = express.Router();
const { comments, posts, todos, users, getCommentsNewId, getPostsNewId, getTodosNewId, getUsersNewId } = require('../data');
const { commentValidation } = require('../validations/comments');
const { todoValidation } = require('../validations/todos');
const { userValidation } = require('../validations/users');

// USERS

router.get('/users', async (req, res, next) => {
  res.json(users);
});

router.get('/users/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const sUser = users.find(user => user.id === parseInt(userId));

  if (!sUser) {
    res.status(404).send('User not found');
  } else {
    res.json(sUser);
  }
});

router.post('/users', async (req, res, next) => {
  const user = req.body;
  const validation = userValidation.validate(user);

  if (validation.error) {
    res.status(400).send(validation.error.message);
  } else {
    usersMaxId = getUsersNewId();
    users.push({id: usersMaxId, ...validation.value})

    res.status(201).json({message: 'User created.', id: usersMaxId});
  }
});

router.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = req.body;
  const validation = userValidation.validate(user);

  if (validation.error) {
    return res.status(400).send(validation.error);
  }

  const index = users.findIndex(user => user.id === parseInt(userId));

  if (index === -1) {
    res.status(404).json({message: 'User not found'});
  } else {
    users[index] = {id: users[index].id, ...validation.value};

    res.status(200).json({message: 'User updated.'})
  }
});

router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const index = users.findIndex(user => user.id === parseInt(userId));

  if (index === -1) {
    res.status(404).json({message: 'User not found'});
  } else {
    users.splice(index, 1);

    res.status(200).json({message: 'User deleted.'})
  }
});

// TODOS

router.get('/todos', async (req, res, next) => {
  const { userId } = req.query;

  if (userId) {
    const filteredTodos = todos.filter(todo => todo.userId === parseInt(userId));
    return res.json(filteredTodos);
  }
  res.json(todos);
});

router.get('/todos/:todoId', async (req, res, next) => {
  const { todoId } = req.params;
  const sTodo = todos.find(todo => todo.id === parseInt(todoId));

  if (!sTodo) {
    res.status(404).json({message:'Todo not found'});
  } else {
    res.json(sTodo);
  }
});

router.post('/todos', async (req, res) => {
  const todo = req.body;
  const validation = todoValidation.validate(todo);

  if (validation.error) {
    res.status(400).send(validation.error);
  } else {
    todosMaxId = getTodosNewId();
    todos.push({id: todosMaxId, ...validation.value})

    res.status(201).json({message: 'Todo created.', id: todosMaxId});
  }
});

router.put('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const todo = req.body;
  const validation = todoValidation.validate(todo);

  if (validation.error) {
    return res.status(400).send(validation.error);
  }

  const index = todos.findIndex(todo => todo.id === parseInt(todoId));

  if (index === -1) {
    res.status(404).json({message: 'Todo not found'});
  } else {
    todos[index] = {id: todos[index].id, ...validation.value};

    res.status(200).json({message: 'Todo updated.'})
  }
});

router.delete('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const index = todos.findIndex(todo => todo.id === parseInt(todoId));

  if (index === -1) {
    res.status(404).json({message: 'Todo not found'});
  } else {
    todos.splice(index, 1);

    res.status(200).json({message: 'Todo deleted.'})
  }
});

// POSTS

router.get('/posts', async (req, res, next) => {
  const { userId } = req.query;

  if (userId) {
    const filteredPosts = posts.filter(post => post.userId === parseInt(userId));
    return res.json(filteredPosts);
  }

  res.json(posts);
});

router.get('/posts/:postId', async (req, res, next) => {
  const { postId } = req.params;
  const sPost = posts.find(post => post.id === parseInt(postId));

  if (!sPost) {
    res.status(404).json({message:'Post not found'});
  } else {
    res.json(sPost);
  }
});

router.get('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const sPost = posts.find(post => post.id === parseInt(postId));

  if (!sPost) {
    return res.status(404).json({message:'Post not found'});
  } 

  const filteredComments = comments.filter(comment => comment.postId === parseInt(postId));
  res.json(filteredComments);
  
});

router.post('/posts', async (req, res) => {
  const post = req.body;
  const validation = postValidation.validate(post);

  if (validation.error) {
    res.status(400).send(validation.error);
  } else {
    postsMaxId = getPostsNewId();
    posts.push({id: postsMaxId, ...validation.value})

    res.status(201).json({message: 'post created.', id: postsMaxId});
  }
});

router.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = req.body;
  const validation = postValidation.validate(post);

  if (validation.error) {
    return res.status(400).send(validation.error);
  }

  const index = posts.findIndex(post => post.id === parseInt(postId));

  if (index === -1) {
    res.status(404).json({message: 'Post not found'});
  } else {
    posts[index] = {id: posts[index].id, ...validation.value};

    res.status(200).json({message: 'Post updated.'})
  }
});

router.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const index = posts.findIndex(post => post.id === parseInt(postId));

  if (index === -1) {
    res.status(404).json({message: 'Post not found'});
  } else {
    posts.splice(index, 1);

    res.status(200).json({message: 'Post deleted.'})
  }
});


// COMMENTS

router.get('/comments', async (req, res, next) => {
  const { postId } = req.query;

  if (postId) {
    const filteredComments = comments.filter(comment => comment.postId === parseInt(postId));
    return res.json(filteredComments);
  }

  res.json(comments);
});

router.get('/comments/:commentId', async (req, res, next) => {
  const { commentId } = req.params;
  const sComment = comments.find(comment => comment.id === parseInt(commentId));

  if (!sComment) {
    res.status(404).json({message:'Comment not found'});
  } else {
    res.json(sComment);
  }
});

router.post('/comments', async (req, res) => {
  const comment = req.body;
  const validation = commentValidation.validate(comment);

  if (validation.error) {
    res.status(400).send(validation.error);
  } else {
    commentsMaxId = getCommentsNewId();
    comments.push({id: commentsMaxId, ...validation.value})

    res.status(201).json({message: 'Comment created.', id: commentsMaxId});
  }
});

router.put('/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const comment = req.body;
  const validation = commentValidation.validate(comment);

  if (validation.error) {
    return res.status(400).send(validation.error);
  }

  const index = comments.findIndex(comment => comment.id === parseInt(commentId));

  if (index === -1) {
    res.status(404).json({message: 'Comment not found'});
  } else {
    comments[index] = {id: comments[index].id, ...validation.value};

    res.status(200).json({message: 'Comment updated.'})
  }
});

router.delete('/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const index = comments.findIndex(comment => comment.id === parseInt(commentId));

  if (index === -1) {
    res.status(404).json({message: 'Comment not found'});
  } else {
    comments.splice(index, 1);

    res.status(200).json({message: 'Comment deleted.'})
  }
});

module.exports = router;
