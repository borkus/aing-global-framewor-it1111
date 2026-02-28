import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockForumData, ForumPost } from '@/lib/mockData';
import { toast } from 'sonner';
import useUserStore from '@/stores/userStore';
function PostCard({ post }: { post: ForumPost }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 p-4 bg-muted/50">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">{post.author.title}</p>
        </div>
        <p className="text-sm text-muted-foreground ml-auto">{post.timestamp}</p>
      </CardHeader>
      <CardContent className="p-6">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
    </Card>
  );
}
export default function ForumThreadPage() {
  const { threadId } = useParams();
  const thread = mockForumData.threads.find(t => t.id === threadId);
  const isAuthenticated = useUserStore(s => s.isAuthenticated);
  const user = useUserStore(s => s.user);
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    if (!thread) return [];
    const originalPost = thread.posts[0];
    return [originalPost, ...(originalPost.replies || [])];
  });
  if (!thread) {
    return (
      <PageShell title="Thread Not Found">
        <p>The discussion you are looking for does not exist or has been moved.</p>
      </PageShell>
    );
  }
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to reply.");
      return;
    }
    const form = e.target as HTMLFormElement;
    const textarea = form.elements.namedItem('reply-content') as HTMLTextAreaElement;
    const content = textarea.value;
    if (!content.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }
    const newReply: ForumPost = {
      id: `post-${Date.now()}`,
      author: {
        name: `${user.firstName} ${user.lastName}`,
        avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`,
        title: `AING™ ${user.membershipTier}`,
      },
      content: content.trim(),
      timestamp: 'Just now',
    };
    setPosts(prevPosts => [...prevPosts, newReply]);
    toast.success("Reply posted!", { description: "Your reply has been added to the discussion." });
    textarea.value = '';
  };
  return (
    <PageShell title={thread.title}>
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.map((post, index) => (
          <div key={post.id} className={index > 0 ? "ml-0 sm:ml-12" : ""}>
            <PostCard post={post} />
          </div>
        ))}
        {isAuthenticated && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Post a Reply</h3>
            </CardHeader>
            <form onSubmit={handleReplySubmit}>
              <CardContent>
                <Textarea
                  id="reply-content"
                  placeholder="Write your reply here..."
                  rows={5}
                  required
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Post Reply</Button>
              </CardFooter>
            </form>
          </Card>
        )}
        {!isAuthenticated && (
          <Card className="text-center p-8">
            <p className="text-muted-foreground">Please log in to join the discussion.</p>
            <Button asChild className="mt-4">
              <a href="/login">Login to Reply</a>
            </Button>
          </Card>
        )}
      </div>
    </PageShell>
  );
}