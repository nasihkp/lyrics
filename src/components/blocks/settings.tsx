
import {
  Moon,
  Sun,
  ArrowLeft,
  Music,
  Shield,
  Smartphone,
  Globe,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const SettingsSection = ({ title, icon: Icon, children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-panel rounded-2xl p-6 mb-6"
  >
    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <h2 className="text-lg font-semibold text-foreground tracking-wide">{title}</h2>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </motion.div>
);

const SettingItem = ({ label, description, rightElement, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer`}
  >
    <div className="flex-1 pr-4">
      <h3 className="text-foreground font-medium flex items-center gap-2">
        {label}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
    <div className="flex items-center gap-3">
      {rightElement}
      <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
    </div>
  </div>
);

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 pb-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6 mb-12"
        >
          <Link
            to="/"
            className="p-3 rounded-full hover:bg-white/5 text-foreground/80 hover:text-foreground transition-all duration-300 pointer-events-auto"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage your preferences and music experience
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div>
            <SettingsSection title="Appearance" icon={Sun} delay={0.1}>
              <SettingItem
                label="App Theme"
                description={isDarkMode ? "Dark Mode" : "Light Mode"}
                rightElement={
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="p-2 rounded-full bg-secondary text-primary hover:scale-105 transition-transform"
                  >
                    {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                }
              />
              <SettingItem
                label="Font Size"
                description="Medium (Default)"
              />
              <SettingItem
                label="Animations"
                description="Enable fluid UI effects"
                rightElement={
                  <div className="w-10 h-6 rounded-full bg-primary/20 relative">
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary" />
                  </div>
                }
              />
            </SettingsSection>

            <SettingsSection title="Audio Quality" icon={Music} delay={0.2}>
              <SettingItem
                label="Streaming Quality"
                description="High fidelity (Lossless)"
                rightElement={<span className="text-xs font-bold px-2 py-1 rounded bg-green-500/10 text-green-500">Hi-Res</span>}
              />
              <SettingItem
                label="Download Quality"
                description="Standard (128kbps)"
              />
              <SettingItem
                label="Equalizer"
                description="Custom preset 'Bass Boost'"
              />
            </SettingsSection>
          </div>

          {/* Column 2 */}
          <div>
            <SettingsSection title="System" icon={Smartphone} delay={0.3}>
              <SettingItem
                label="Language"
                description="English (US)"
                rightElement={<Globe size={16} className="text-muted-foreground" />}
              />
              <SettingItem
                label="Notifications"
                description="Push notifications enabled"
                rightElement={<Bell size={16} className="text-muted-foreground" />}
              />
              <SettingItem
                label="Clear Cache"
                description="Free up storage space (1.2 GB utilized)"
                rightElement={<span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">Clear</span>}
              />
            </SettingsSection>

            <SettingsSection title="Privacy & About" icon={Shield} delay={0.4}>
              <SettingItem
                label="Version"
                description="v2.4.0 (Build 2024.1.15)"
                rightElement={<span className="text-xs text-muted-foreground font-mono">BETA</span>}
              />
              <SettingItem
                label="Privacy Policy"
              />
              <SettingItem
                label="Terms of Service"
              />
            </SettingsSection>
          </div>
        </div>
      </div>
    </div>
  );
}; 