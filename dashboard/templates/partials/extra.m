<p class="server-members sinfo"><svg class="ssvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> Members: <%= guild.memberCount %>/<%= guild.maximumMembers %>
<p class="server-boosts sinfo"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg> Server boosts: <%= guild.premiumSubscriptionCount %> (<%= guild.premiumTier %> level)</p>
<hr>
<h2 style="color: #fff">Roles</h2>
<% 
 let startstring = "<span class='r' style='color:";
 let middlestring = "'>";
 let endstring = "</span>";
 let rolemap = guild.roles.cache
 .sort((a, b) => b.position - a.position)
 .map(r => startstring + r.hexColor + middlestring + r.name + endstring)
 .join(" "); %>
<% if (rolemap.length > 11024) {
 rolemap = "To many roles to display";
} %>
<% if (!rolemap) {
 rolemap = "No roles";
} %>
<%- rolemap -%>
</div>
