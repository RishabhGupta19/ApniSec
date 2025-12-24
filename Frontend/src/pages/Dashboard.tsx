import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Cloud, Target, Search as SearchIcon, Loader2, Trash2, Edit, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { issuesApi } from "@/services/api";
import type { Issue, IssueType, IssueStatus, IssuePriority, CreateIssueRequest } from "@/types";
import { ISSUE_TYPE_LABELS, ISSUE_STATUS_LABELS, ISSUE_PRIORITY_LABELS, STATUS_COLORS, PRIORITY_COLORS } from "@/types";
import { IssueForm } from "@/components/dashboard/IssueForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [filters, setFilters] = useState({ type: "", status: "", search: "" });

  const fetchIssues = async () => {
    setIsLoading(true);
    const result = await issuesApi.getAll({
      type: filters.type as IssueType || undefined,
      status: filters.status as IssueStatus || undefined,
      search: filters.search || undefined,
    });
    if (result.success && result.data) {
      setIssues(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, [filters.type, filters.status,filters.search]);
  
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   fetchIssues();
  // };

  const handleCreateOrUpdate = async (data: CreateIssueRequest) => {
    if (editingIssue) {
      const result = await issuesApi.update(editingIssue.id, data);
      if (result.success) {
        toast({ title: "Issue updated successfully" });
        fetchIssues();
      }
    } else {
      const result = await issuesApi.create(data);
      if (result.success) {
        toast({ title: "Issue created successfully" });
        fetchIssues();
      }
    }
    setIsDialogOpen(false);
    setEditingIssue(null);
  };

  const handleDelete = async (id: string) => {
    const result = await issuesApi.delete(id);
    if (result.success) {
      toast({ title: "Issue deleted" });
      fetchIssues();
    }
  };

  const stats = {
    total: issues.length,
    open: issues.filter(i => i.status === "open").length,
    inProgress: issues.filter(i => i.status === "in_progress").length,
    resolved: issues.filter(i => i.status === "resolved").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold font-display">Apni<span className="text-primary">Sec</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="ghost" size="sm"><User className="h-4 w-4 mr-2" />Profile</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={async ()=>{await logout(); navigate("/");} }><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display mb-2">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-muted-foreground">Manage your security issues and track vulnerabilities.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Issues</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{stats.total}</p></CardContent></Card>
          <Card className="glass-card"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Open</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-secondary">{stats.open}</p></CardContent></Card>
          <Card className="glass-card"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">In Progress</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-warning">{stats.inProgress}</p></CardContent></Card>
          <Card className="glass-card"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Resolved</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-success">{stats.resolved}</p></CardContent></Card>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <Input placeholder="Search issues..." value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} className="max-w-sm" />
            <Button type="submit" variant="outline"><Search className="h-4 w-4" /></Button>
          </form>  */}
          <div className="flex-1 flex gap-2">
                        <Input
                          placeholder="Search issues..."
                          value={filters.search}
                          onChange={(e) =>
                            setFilters((f) => ({ ...f, search: e.target.value }))
                          }
                          className="max-w-sm"
                        />
                        <Button variant="outline" disabled>
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>

          <div className="flex gap-2">
            <Select value={filters.type} onValueChange={v => setFilters(f => ({ ...f, type: v === "all" ? "" : v }))}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="cloud_security">Cloud Security</SelectItem><SelectItem value="reteam_assessment">Reteam Assessment</SelectItem><SelectItem value="vapt">VAPT</SelectItem></SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={v => setFilters(f => ({ ...f, status: v === "all" ? "" : v }))}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="open">Open</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="resolved">Resolved</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
            </Select>
            <Dialog open={isDialogOpen} onOpenChange={o => { setIsDialogOpen(o); if (!o) setEditingIssue(null); }}>
              <DialogTrigger asChild><Button className="gradient-primary"><Plus className="h-4 w-4 mr-2" />New Issue</Button></DialogTrigger>
              <DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>{editingIssue ? "Edit Issue" : "Create Issue"}</DialogTitle></DialogHeader><IssueForm issue={editingIssue} onSubmit={handleCreateOrUpdate} /></DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Issues List */}
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : issues.length === 0 ? (
          <Card className="glass-card"><CardContent className="py-12 text-center"><p className="text-muted-foreground">No issues found. Create your first issue!</p></CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {issues.map(issue => (
              <Card key={issue.id} className="glass-card hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{ISSUE_TYPE_LABELS[issue.type]}</Badge>
                      <Badge className={STATUS_COLORS[issue.status]}>{ISSUE_STATUS_LABELS[issue.status]}</Badge>
                      <Badge className={PRIORITY_COLORS[issue.priority]}>{ISSUE_PRIORITY_LABELS[issue.priority]}</Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{issue.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingIssue(issue); setIsDialogOpen(true); }}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(issue.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
