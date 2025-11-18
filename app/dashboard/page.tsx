"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Team, TeamMember, Devlog } from "@/types/supabase"; 

export default function DashboardPage() {
  // --- Team state ---
  const [team, setTeam] = useState<Team | null>(null); 
  const [status, setStatus] = useState("");
  const [readiness, setReadiness] = useState("");
  const [objectives, setObjectives] = useState("");
  const [message, setMessage] = useState("");

  // --- Devlog state ---
  const [devlogTitle, setDevlogTitle] = useState("");
  const [devlogDescription, setDevlogDescription] = useState("");
  const [devlogMedia, setDevlogMedia] = useState("");
  const [devlogMessage, setDevlogMessage] = useState("");

  // --- Team Members state ---
  const [members, setMembers] = useState<TeamMember[]>([]); 
  const [memberForm, setMemberForm] = useState<Partial<TeamMember>>({ 
    id: undefined,
    name: "",
    role: "",
    major: "",
    contribution: "",
    linkedin_url: "",
    github_url: "",
  });
  const [memberMessage, setMemberMessage] = useState("");

  // --- Load Team Info and Members ---
  useEffect(() => {
    const getUserTeam = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // get this user's team
      const { data: teamData } = await supabase
        .from("teams")
        .select("*")
        .eq("owner_id", user.id)
        .single();

      if (teamData) {
        setTeam(teamData as Team);
        setStatus(teamData.status ?? "");
        setReadiness(teamData.launch_readiness ?? "");
        setObjectives((teamData.step4_objectives ?? []).join(", "));

        // get existing team members for this team
        const { data: memberData, error: memberError } = await supabase
          .from("team_members")
          .select("*")
          .eq("team_id", teamData.id);

        if (memberError) console.error("Error fetching members:", memberError);
        else setMembers((memberData as TeamMember[]) || []);
      }
    };
    getUserTeam();
  }, []);

  // --- Save Team Updates (unchanged) ---
  const handleSave = async () => {
    if (!team) return;
    const { error } = await supabase
      .from("teams")
      .update({
        status,
        launch_readiness: readiness,
        step4_objectives: objectives.split(",").map((o) => o.trim()),
      })
      .eq("id", team.id);

    setMessage(error ? "Error saving changes." : "Changes saved!");
  };

  // --- Add Devlog (unchanged) ---
  const handleAddDevlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setDevlogMessage("You must be logged in to add a devlog.");
      return;
    }

    const { error } = await supabase.from("devlogs").insert([
      {
        title: devlogTitle,
        description: devlogDescription,
        media_url: devlogMedia,
        team_id: team.id,
        owner_id: user.id,
      } satisfies Partial<Devlog>, 
    ]);

    if (error) {
      console.error("Error adding devlog:", error);
      setDevlogMessage("Error adding devlog.");
    } else {
      setDevlogMessage("Devlog added successfully!");
      setDevlogTitle("");
      setDevlogDescription("");
      setDevlogMedia("");
    }
  };

  // --- Add / Update Team Member ---
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const payload: Partial<TeamMember> = {
      name: memberForm.name ?? "",
      role: memberForm.role ?? "",
      major: memberForm.major ?? "",
      contribution: memberForm.contribution ?? "",
      linkedin_url: memberForm.linkedin_url ?? "",
      github_url: memberForm.github_url ?? "",
      team_id: team.id,
      owner_id: user.id,
    };

    let error;
    if (memberForm.id) {
  ({ error } = await supabase
    .from("team_members")
    .update(payload)
    .eq("id", Number(memberForm.id)));
}
 else {
      // add new member
      ({ error } = await supabase.from("team_members").insert([payload]));
    }

    if (error) {
      console.error("Error saving member:", error);
      setMemberMessage("Error saving member.");
    } else {
      setMemberMessage("Member saved successfully!");
      setMemberForm({
        id: undefined,
        name: "",
        role: "",
        major: "",
        contribution: "",
        linkedin_url: "",
        github_url: "",
      });
      // refresh member list
      const { data: updatedMembers } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", team.id);
      setMembers((updatedMembers as TeamMember[]) || []);
    }
  };

  // --- Edit Member ---
  const handleEditMember = (member: TeamMember) => {
    setMemberForm(member);
  };

  // --- Delete Member ---
  const handleDeleteMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) console.error("Error deleting member:", error);
    else setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 overflow-y-auto py-10">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Dashboard
        </h1>

        {team ? (
          <>
            {/* Team Update Form*/}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Update Team Info
            </h2>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Readiness */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Launch Readiness
              </label>
              <select
                value={readiness}
                onChange={(e) => setReadiness(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              >
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
              </select>
            </div>

            {/* Objectives */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Step 4 Objectives (comma separated)
              </label>
              <textarea
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                rows={3}
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>

            {message && <p className="mt-4 text-green-600">{message}</p>}

            <hr className="my-8" />

            {/*Devlog Form*/}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add a New Devlog
            </h2>
            <form onSubmit={handleAddDevlog}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={devlogTitle}
                  onChange={(e) => setDevlogTitle(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Devlog title"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={devlogDescription}
                  onChange={(e) => setDevlogDescription(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  rows={3}
                  placeholder="Devlog description"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Media URL
                </label>
                <input
                  type="text"
                  value={devlogMedia}
                  onChange={(e) => setDevlogMedia(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Link to video, image, or document"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                Add Devlog
              </button>
            </form>
            {devlogMessage && (
              <p className="mt-4 text-green-600">{devlogMessage}</p>
            )}

            <hr className="my-8" />

            {/*Team Members Section */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Manage Team Members
            </h2>

            <form onSubmit={handleSaveMember}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={memberForm.name ?? ""}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-gray-900"
                  placeholder="Enter member's full name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={memberForm.role ?? ""}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-gray-900"
                  placeholder="e.g., Software Developer, Team Lead"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Major</label>
                <input
                  type="text"
                  value={memberForm.major ?? ""}
                  onChange={(e) => setMemberForm({ ...memberForm, major: e.target.value })}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-gray-900"
                  placeholder="e.g., CS, CpE (VLSI Track)"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Contribution</label>
                <textarea
                  value={memberForm.contribution ?? ""}
                  onChange={(e) => setMemberForm({ ...memberForm, contribution: e.target.value })}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-gray-900"
                  rows={3}
                  placeholder="Describe this member's contribution"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input
                  type="text"
                  value={memberForm.linkedin_url ?? ""}
                  onChange={(e) => setMemberForm({ ...memberForm, linkedin_url: e.target.value })}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-gray-900"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                <input
                  type="text"
                  value={memberForm.github_url ?? ""}
                  onChange={(e) => setMemberForm({ ...memberForm, github_url: e.target.value })}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-gray-900"
                  placeholder="https://github.com/username"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition"
              >
                {memberForm.id ? "Update Member" : "Add Member"}
              </button>
            </form>

            {memberMessage && <p className="mt-4 text-green-600">{memberMessage}</p>}

            <div className="mt-6 space-y-3">
              {members.map((m) => (
                <div key={m.id} className="flex justify-between items-start bg-gray-50 p-3 rounded-md border">
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-sm text-gray-600">{m.role}</p>
                    <p className="text-sm text-gray-600">{m.major}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditMember(m)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMember(m.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600">Loading your team info...</p>
        )}
      </div>
    </main>
  );
}