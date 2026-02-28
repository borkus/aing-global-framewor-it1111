import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockForumData, ForumThread } from '@/lib/mockData';
import { Hash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import useUserStore from '@/stores/userStore';
import { cn } from '@/lib/utils';
function NewDiscussionForm({ onCreate, onOpenChange }: { onCreate: (thread: ForumThread) => void; onOpenChange: (open: boolean) => void; }) {
  const user = useUserStore(s => s.user);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content) {
      toast.error("Please fill out all fields.");
      return;
    }
    const newThread: ForumThread = {
      id: `thread-${Date.now()}`,
      title,
      category,
      authorName: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
      repliesCount: 0,
      lastReply: 'Just now',
      posts: [{
        id: `post-${Date.now()}`,
        author: {
          name: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
          avatarUrl: `https://i.pravatar.cc/150?u=${user?.id || 'anonymous'}`,
          title: user?.membershipTier ? `AING™ ${user.membershipTier}` : 'Member',
        },
        content,
        timestamp: 'Just now',
        replies: [],
      }],
    };
    onCreate(newThread);
    toast.success("Discussion started!");
    onOpenChange(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a descriptive title" required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategory} value={category} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {mockForumData.categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Start your discussion..." rows={6} required />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit">Create Thread</Button>
      </DialogFooter>
    </form>
  );
}
export default function ForumsPage() {
  const [threads, setThreads] = useState<ForumThread[]>(mockForumData.threads);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useUserStore(s => s.isAuthenticated);
  const filteredThreads = useMemo(() => {
    if (!activeCategory) return threads;
    return threads.filter(thread => thread.category === activeCategory);
  }, [threads, activeCategory]);
  const handleCreateThread = (newThread: ForumThread) => {
    setThreads(prev => [newThread, ...prev]);
  };
  return (
    <PageShell title="Community Forums">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeCategory ? mockForumData.categories.find(c => c.id === activeCategory)?.name : 'Recent Discussions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {filteredThreads.map(thread => (
                  <li key={thread.id} className="p-4 rounded-md hover:bg-accent transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/community/forums/${thread.id}`} className="font-semibold text-lg hover:underline">
                          {thread.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Started by {thread.authorName} in <span className="font-medium text-indigo-600">{thread.category}</span>
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground flex-shrink-0 ml-4">
                        <p>{thread.repliesCount} replies</p>
                        <p>{thread.lastReply}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full" disabled={!isAuthenticated} onClick={() => isAuthenticated ? setIsModalOpen(true) : toast.error("Please log in to start a discussion.")}>
                Start a New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start a New Discussion</DialogTitle>
              </DialogHeader>
              <NewDiscussionForm onCreate={handleCreateThread} onOpenChange={setIsModalOpen} />
            </DialogContent>
          </Dialog>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => setActiveCategory(null)} className={cn("flex items-start gap-3 p-2 rounded-md hover:bg-accent transition-colors w-full text-left", !activeCategory && "bg-accent")}>
                    <Hash className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-semibold">All Discussions</h4>
                      <p className="text-sm text-muted-foreground">View all recent topics</p>
                    </div>
                  </button>
                </li>
                {mockForumData.categories.map(category => (
                  <li key={category.id}>
                    <button onClick={() => setActiveCategory(category.id)} className={cn("flex items-start gap-3 p-2 rounded-md hover:bg-accent transition-colors w-full text-left", activeCategory === category.id && "bg-accent")}>
                      <Hash className="h-5 w-5 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-semibold">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}