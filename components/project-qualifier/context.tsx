'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  QualifierData, 
  Step, 
  STEPS_ORDER, 
  ProjectType, 
  Feature, 
  DesignStyle, 
  AnimationLevel, 
  Budget, 
  Deadline, 
  AccompagnementLevel 
} from './types';

const STORAGE_KEY = 'project-qualifier-data';
const STEP_STORAGE_KEY = 'project-qualifier-step';

interface QualifierContextType {
  // State
  data: QualifierData;
  currentStep: Step;
  isOpen: boolean;
  
  // Navigation
  goToStep: (step: Step) => void;
  goNext: () => void;
  goPrevious: () => void;
  skipStep: () => void;
  resetQualifier: () => void;
  
  // Data setters
  setProjectType: (type: ProjectType | null) => void;
  toggleFeature: (feature: Feature) => void;
  setFeatureOther: (text: string) => void;
  setDesignStyle: (style: DesignStyle | null) => void;
  setAnimationLevel: (level: AnimationLevel | null) => void;
  setBudget: (budget: Budget | null) => void;
  setDeadline: (deadline: Deadline | null) => void;
  setAccompagnement: (level: AccompagnementLevel | null) => void;
  setInspirations: (text: string) => void;
  
  // UI
  openQualifier: () => void;
  closeQualifier: () => void;
  
  // Utils
  getProgress: () => number;
  getCompletedSteps: () => number;
  canGoNext: () => boolean;
  canGoPrevious: () => boolean;
  getStepNumber: () => number;
  getTotalSteps: () => number;
}

const defaultData: QualifierData = {
  projectType: null,
  features: [],
  featureOther: '',
  designStyle: null,
  animationLevel: null,
  budget: null,
  deadline: null,
  accompagnement: null,
  inspirations: '',
};

const QualifierContext = createContext<QualifierContextType | undefined>(undefined);

export function QualifierProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<QualifierData>(defaultData);
  const [currentStep, setCurrentStep] = useState<Step>('project-type'); // Skip intro, start directly at first step
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Charger les données depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
      
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch {
          console.error('Erreur lors du chargement des données');
        }
      }
      
      if (savedStep && STEPS_ORDER.includes(savedStep as Step)) {
        // Si l'étape sauvegardée est 'intro', aller directement à 'project-type'
        setCurrentStep(savedStep === 'intro' ? 'project-type' : savedStep as Step);
      }
      
      setIsInitialized(true);
    }
  }, []);

  // Sauvegarder les données dans localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isInitialized]);

  // Sauvegarder l'étape courante
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(STEP_STORAGE_KEY, currentStep);
    }
  }, [currentStep, isInitialized]);

  // Navigation
  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step);
  }, []);

  const goNext = useCallback(() => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    if (currentIndex < STEPS_ORDER.length - 1) {
      setCurrentStep(STEPS_ORDER[currentIndex + 1]);
    }
  }, [currentStep]);

  const goPrevious = useCallback(() => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    // Ne jamais revenir à l'intro (index 0), donc vérifier > 1
    if (currentIndex > 1) {
      setCurrentStep(STEPS_ORDER[currentIndex - 1]);
    }
  }, [currentStep]);

  const skipStep = useCallback(() => {
    goNext();
  }, [goNext]);

  const resetQualifier = useCallback(() => {
    setData(defaultData);
    setCurrentStep('project-type'); // Reset to first step, skip intro
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    }
  }, []);

  // Data setters
  const setProjectType = useCallback((type: ProjectType | null) => {
    setData(prev => ({ ...prev, projectType: type }));
  }, []);

  const toggleFeature = useCallback((feature: Feature) => {
    setData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  }, []);

  const setFeatureOther = useCallback((text: string) => {
    setData(prev => ({ ...prev, featureOther: text }));
  }, []);

  const setDesignStyle = useCallback((style: DesignStyle | null) => {
    setData(prev => ({ ...prev, designStyle: style }));
  }, []);

  const setAnimationLevel = useCallback((level: AnimationLevel | null) => {
    setData(prev => ({ ...prev, animationLevel: level }));
  }, []);

  const setBudget = useCallback((budget: Budget | null) => {
    setData(prev => ({ ...prev, budget: budget }));
  }, []);

  const setDeadline = useCallback((deadline: Deadline | null) => {
    setData(prev => ({ ...prev, deadline: deadline }));
  }, []);

  const setAccompagnement = useCallback((level: AccompagnementLevel | null) => {
    setData(prev => ({ ...prev, accompagnement: level }));
  }, []);

  const setInspirations = useCallback((text: string) => {
    setData(prev => ({ ...prev, inspirations: text }));
  }, []);

  // UI
  const openQualifier = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeQualifier = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Utils
  const getProgress = useCallback(() => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    return ((currentIndex) / (STEPS_ORDER.length - 1)) * 100;
  }, [currentStep]);

  const getCompletedSteps = useCallback(() => {
    let count = 0;
    if (data.projectType) count++;
    if (data.features.length > 0) count++;
    if (data.designStyle) count++;
    if (data.animationLevel) count++;
    if (data.budget) count++;
    if (data.deadline) count++;
    if (data.accompagnement) count++;
    if (data.inspirations) count++;
    return count;
  }, [data]);

  const canGoNext = useCallback(() => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    return currentIndex < STEPS_ORDER.length - 1;
  }, [currentStep]);

  const canGoPrevious = useCallback(() => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    // Ne pas permettre de revenir à l'intro (index 0), donc > 1
    return currentIndex > 1;
  }, [currentStep]);

  const getStepNumber = useCallback(() => {
    // Retourne le numéro d'étape en excluant l'intro (commence à 1)
    const index = STEPS_ORDER.indexOf(currentStep);
    return index > 0 ? index : 1;
  }, [currentStep]);

  const getTotalSteps = useCallback(() => {
    return STEPS_ORDER.length - 2; // Exclude intro and summary
  }, []);

  return (
    <QualifierContext.Provider
      value={{
        data,
        currentStep,
        isOpen,
        goToStep,
        goNext,
        goPrevious,
        skipStep,
        resetQualifier,
        setProjectType,
        toggleFeature,
        setFeatureOther,
        setDesignStyle,
        setAnimationLevel,
        setBudget,
        setDeadline,
        setAccompagnement,
        setInspirations,
        openQualifier,
        closeQualifier,
        getProgress,
        getCompletedSteps,
        canGoNext,
        canGoPrevious,
        getStepNumber,
        getTotalSteps,
      }}
    >
      {children}
    </QualifierContext.Provider>
  );
}

export function useQualifier() {
  const context = useContext(QualifierContext);
  if (context === undefined) {
    throw new Error('useQualifier must be used within a QualifierProvider');
  }
  return context;
}

