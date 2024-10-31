import { memo, useState, useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { ChevronUp, ChevronDown } from "lucide-react";
import { getAllConversations } from '@/apis/chatgpt-direct';
import { CheckedState } from '@radix-ui/react-checkbox';

interface SettingsPanelProps {
  refreshInterval: number;
  setRefreshInterval: (refreshInterval: number) => void;
  autoScroll: boolean;
  setAutoScroll: (scroll: boolean) => void;
  autoExpandSentences: boolean;
  setAutoExpandSentences: (expand: boolean) => void;
  autoExpandWords: boolean;
  setAutoExpandWords: (expand: boolean) => void;
  autoExpandPhrases: boolean;
  setAutoExpandPhrases: (expand: boolean) => void;
  autoCollapsePrevious: boolean;
  setAutoCollapsePrevious: (collapse: boolean) => void;
  fetchMessages: (id: string) => Promise<any>;
  error: any;
}

export const SettingsPanel = memo(({ 
  refreshInterval, 
  setRefreshInterval,
  autoScroll,
  setAutoScroll,
  autoExpandSentences,
  setAutoExpandSentences,
  autoExpandWords,
  setAutoExpandWords,
  autoExpandPhrases,
  setAutoExpandPhrases,
  autoCollapsePrevious,
  setAutoCollapsePrevious,
  fetchMessages,
  error
}: SettingsPanelProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [chatId, setChatId] = useState<string>('');
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
      const storedChatId = localStorage.getItem('chatId');
      if (storedChatId && storedChatId != '') {
        setChatId(storedChatId);    
      }

      return () => {
        stopTimer();
      };
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      // fetch all conversations from chatgpt for selection
      try {
        const response = await getAllConversations();
        if (response.items) {
          setConversations(response.items.map((item: any) => ({
            label: item.title,
            value: item.id
          })));
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();

  }, []);

  useEffect(() => {
    if (error) {
      stopTimer();
    }
  }, [error]);

  const fetchAndStartTimer = () => {
    // Stop any existing timers first
    stopTimer();
    
    setIsTimerActive(true);
  
    fetchMessages(chatId);
    intervalIdRef.current = setInterval(() => {
      fetchMessages(chatId);
      setCountdown(refreshInterval);
    }, 5000);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : refreshInterval));
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
      // fetchAndStartTimer();
    }    
  }, [chatId]);

  return (
    <div className={`z-50 w-full p-4 pt-2`}>
      <div className="">
        <Button
          onClick={fetchAndStartTimer}
          className="mr-4"
        >
          {isTimerActive ? `Refresh in: ${countdown}s` : 'Refresh'}
        </Button>
        {isTimerActive && (
          <Button onClick={stopTimer} variant="outline" className="mr-8">
            Stop
          </Button>
        )}
      </div>

      <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen} className="absolute right-4  top-0 p-2  rounded-lg bg-card text-card-foreground shadow-lg  ">
        <CollapsibleTrigger asChild className="cursor-pointer flex justify-end">
            <div className="p-2">
              {isSettingsOpen && <h3 className="">Settings</h3>}
              {isSettingsOpen ? <ChevronUp className="h-6 w-6 hover:bg-gray-300 rounded-md ml-auto" /> : <ChevronDown className="h-6 w-6 hover:bg-gray-300  rounded-md ml-auto" />}
            </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className={`flex flex-col  ${isSettingsOpen ? 'p-2 space-y-4' : ''}`}>
            <Combobox
              options={conversations}
              value={chatId}
              placeholder="Select a conversation"
              onChange={(id: string) => {
                setChatId(id);
                localStorage.setItem('chatId', id);
              }}
            />

            <Button onClick={() => localStorage.removeItem('chatMessages')}>
              Clear Chat Messages
            </Button>

            <div className="flex items-center gap-2">
              <label htmlFor="refreshInterval">Refresh interval (seconds)</label>
              <Input
                id="refreshInterval"
                type="number"
                placeholder="Refresh interval (seconds)"
                value={refreshInterval}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRefreshInterval(Number(e.target.value))}
                className="w-16"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="autoScroll"
                  checked={autoScroll}
                  onCheckedChange={(checked) => setAutoScroll(checked as boolean)}
                />
                <label htmlFor="autoScroll" className='cursor-pointer'>Auto-scroll to new messages</label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="autoExpandSentences"
                  checked={autoExpandSentences}
                  onCheckedChange={(checked: CheckedState) => setAutoExpandSentences(checked as boolean)}
                />
                <label htmlFor="autoExpandSentences" className='cursor-pointer'>Auto-expand sentences</label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="autoExpandWords"
                  checked={autoExpandWords}
                  onCheckedChange={(checked) => setAutoExpandWords(checked as boolean)}
                />
                <label htmlFor="autoExpandWords">Auto-expand words</label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="autoExpandPhrases"
                  checked={autoExpandPhrases}
                  onCheckedChange={(checked) => setAutoExpandPhrases(checked as boolean)}
                />
                <label htmlFor="autoExpandPhrases">Auto-expand phrases</label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="autoCollapsePrevious"
                  checked={autoCollapsePrevious}
                  onCheckedChange={(checked) => setAutoCollapsePrevious(checked as boolean)}
                />
                <label htmlFor="autoCollapsePrevious" className='cursor-pointer'>Auto-collapse previous messages</label>
              </div>
            </div>
        </CollapsibleContent>
      </Collapsible>
    </div>)
});

SettingsPanel.displayName = 'SettingsPanel';