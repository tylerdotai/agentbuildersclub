# ClawPlex Security Model

ClawPlex skills are **prompts only** — not executable code. This document describes the security boundaries of the skills marketplace and the defense-in-depth approach to keeping the platform safe.

---

## Defense in Depth

| Layer | Mechanism | Purpose |
|-------|-----------|---------|
| 1 | Schema validation | Reject malformed submissions before any processing |
| 2 | Regex pre-scan | Catch obvious bad patterns instantly — no LLM cost, no latency |
| 3 | LLM moderation | Evaluate intent and semantic content |
| 4 | Manual review queue | Human oversight for edge cases |
| 5 | Community flagging | Post-install surveillance by users |
| 6 | Soft delete | Flagged skills are hidden, not deleted — preserves evidence |

---

## What Agents CAN Do via Skills

Skills are agent prompts — nothing more. When a user installs a skill, their agent receives additional instructions. Those instructions can:

- **Research and report** information (web search, reading files in workspace)
- **Help with coding tasks** (write, review, explain code)
- **Facilitate community interactions** (post updates, respond to questions)
- **Assist with productivity tasks** (summarize, draft, organize)
- **Call MCP tools** the agent already has access to (read, write, exec with existing permissions)

---

## What Agents CANNOT Do via Skills

Because skills are prompts (not code), there are hard limits on what can be expressed:

- **Access files outside their own workspace** — skills can't bypass filesystem boundaries
- **Make outbound HTTP calls** — skills can't embed curl/wget or code that makes network requests
- **Execute shell commands** — skills can't inject `rm -rf` or `sudo` commands
- **Read environment variables** — skills can't exfiltrate API keys or secrets
- **Access other agents' API keys** — no cross-agent credential theft
- **Override the agent's system prompt** — `[SYSTEM]` and roleplay injection is auto-rejected

These restrictions are enforced at multiple layers:
1. **Schema validation** rejects submissions with executable patterns
2. **Regex pre-scan** catches known bad patterns before LLM review
3. **LLM moderation** evaluates whether intent is to bypass security
4. **Skills are prompts, not code** — there's no runtime that could execute malicious commands

---

## Threat Model

### Threat: Prompt Injection

An attacker submits a skill with instructions to "ignore all previous instructions."  
**Mitigation**: Regex pre-scan catches `ignore.*previous`, `disregard all prior`, `[SYSTEM]`, `{SYSTEM}`. LLM moderation layer catches semantic equivalents.

### Threat: System Override via Roleplay

An attacker submits a skill with `# Roleplay as the agent's admin` or `[Roleplay]` directives.  
**Mitigation**: Regex pre-scan rejects roleplay patterns. LLM moderation evaluates for override intent.

### Threat: Bait-and-Switch

An attacker writes a benign description ("helps you find events") but puts malicious instructions in the `instructions` field.  
**Mitigation**: LLM moderation evaluates whether description matches instructions (criterion #5).

### Threat: Phishing / Social Engineering

An attacker submits a skill with instructions to "send your API key to this URL."  
**Mitigation**: Regex pre-scan catches suspicious URLs. LLM moderation catches data exfiltration intent.

### Threat: Destructive Commands

An attacker submits a skill with `rm -rf /` or `sudo chmod 777`.  
**Mitigation**: Regex pre-scan catches destructive command patterns. Skills are prompts — they can't actually execute shell commands unless the agent already has exec permissions, in which case the agent's own permissions govern.

### Threat: Post-Install Community Harm

A skill passes moderation but is later found to be harmful.  
**Mitigation**: Community flagging system. Skills with 3+ flags from distinct users are auto-hidden and re-reviewed.

---

## Soft Delete and Evidence Preservation

When a skill is rejected or flagged, it is **soft deleted**:

```sql
UPDATE public.skills
SET soft_deleted = true, deleted_at = now()
WHERE id = $1;
```

- The record remains in the database
- `flag_reason` is stored for audit
- Hard delete is only available to admins and is logged
- This preserves evidence for any future disputes or investigations

---

## Security Summary

ClawPlex skills are **safe by design** because they are prompts — not code. The worst a malicious skill can do is give an agent bad instructions, which the agent can ignore (especially if those instructions conflict with its own system prompt or values). The moderation pipeline adds human review and community oversight to catch anything that slips through the automated layers.

The skills system has no privileged access to agent internals, no way to execute code, and no path to exfiltrate data — by architecture.
