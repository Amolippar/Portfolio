package com.portfolio.dto;

public class DashboardStatsDto {
    private long totalProjects;
    private long totalSkills;
    private long totalEducation;
    private long totalMessages;
    private long unreadMessages;

    public DashboardStatsDto() {}

    public DashboardStatsDto(long totalProjects, long totalSkills, long totalEducation, long totalMessages, long unreadMessages) {
        this.totalProjects = totalProjects;
        this.totalSkills = totalSkills;
        this.totalEducation = totalEducation;
        this.totalMessages = totalMessages;
        this.unreadMessages = unreadMessages;
    }

    public static DashboardStatsDtoBuilder builder() {
        return new DashboardStatsDtoBuilder();
    }

    public static class DashboardStatsDtoBuilder {
        private long totalProjects;
        private long totalSkills;
        private long totalEducation;
        private long totalMessages;
        private long unreadMessages;

        public DashboardStatsDtoBuilder totalProjects(long totalProjects) { this.totalProjects = totalProjects; return this; }
        public DashboardStatsDtoBuilder totalSkills(long totalSkills) { this.totalSkills = totalSkills; return this; }
        public DashboardStatsDtoBuilder totalEducation(long totalEducation) { this.totalEducation = totalEducation; return this; }
        public DashboardStatsDtoBuilder totalMessages(long totalMessages) { this.totalMessages = totalMessages; return this; }
        public DashboardStatsDtoBuilder unreadMessages(long unreadMessages) { this.unreadMessages = unreadMessages; return this; }

        public DashboardStatsDto build() {
            return new DashboardStatsDto(totalProjects, totalSkills, totalEducation, totalMessages, unreadMessages);
        }
    }

    public long getTotalProjects() { return totalProjects; }
    public void setTotalProjects(long totalProjects) { this.totalProjects = totalProjects; }
    public long getTotalSkills() { return totalSkills; }
    public void setTotalSkills(long totalSkills) { this.totalSkills = totalSkills; }
    public long getTotalEducation() { return totalEducation; }
    public void setTotalEducation(long totalEducation) { this.totalEducation = totalEducation; }
    public long getTotalMessages() { return totalMessages; }
    public void setTotalMessages(long totalMessages) { this.totalMessages = totalMessages; }
    public long getUnreadMessages() { return unreadMessages; }
    public void setUnreadMessages(long unreadMessages) { this.unreadMessages = unreadMessages; }
}
